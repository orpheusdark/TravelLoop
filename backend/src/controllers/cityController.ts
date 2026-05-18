import { Request, Response } from 'express';
import axios from 'axios';
import prisma from '../prisma';

const geoApiHost = 'wft-geo-db.p.rapidapi.com';
const geoApiKey = process.env.GEODB_API_KEY;
const weatherKey = process.env.OPENWEATHER_API_KEY;
const countryUrl = 'https://restcountries.com/v3.1/alpha/';

const fallbackCities = [
  { externalCityId: 'fallback-lisbon', name: 'Lisbon', country: 'Portugal', latitude: 38.7223, longitude: -9.1393, averageCost: 145, popularityScore: 92, region: 'Lisbon', currency: 'EUR' },
  { externalCityId: 'fallback-porto', name: 'Porto', country: 'Portugal', latitude: 41.1579, longitude: -8.6291, averageCost: 132, popularityScore: 88, region: 'Porto', currency: 'EUR' },
  { externalCityId: 'fallback-barcelona', name: 'Barcelona', country: 'Spain', latitude: 41.3851, longitude: 2.1734, averageCost: 168, popularityScore: 95, region: 'Catalonia', currency: 'EUR' },
  { externalCityId: 'fallback-rome', name: 'Rome', country: 'Italy', latitude: 41.9028, longitude: 12.4964, averageCost: 154, popularityScore: 94, region: 'Lazio', currency: 'EUR' },
  { externalCityId: 'fallback-tokyo', name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503, averageCost: 208, popularityScore: 98, region: 'Tokyo', currency: 'JPY' }
];

const fallbackWeather = { temp: 24, condition: 'Clear' };

const enrichCity = async (city: any) => {
  const weather = weatherKey && city.latitude && city.longitude
    ? await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: { lat: city.latitude, lon: city.longitude, appid: weatherKey, units: 'metric' }
      }).then((response) => response.data).catch(() => null)
    : null;

  return {
    externalCityId: city.externalCityId,
    name: city.name,
    region: city.region,
    country: city.country,
    latitude: city.latitude,
    longitude: city.longitude,
    averageCost: city.averageCost,
    popularityScore: city.popularityScore,
    image: `https://images.unsplash.com/photo-1506976785307-8732e854ad5d?auto=format&fit=crop&w=900&q=60&city=${encodeURIComponent(city.name)}`,
    weather: weather ? { temp: weather.main.temp, condition: weather.weather[0].main } : fallbackWeather,
    currency: city.currency || 'USD'
  };
};

export const searchCities = async (req: Request, res: Response) => {
  const query = String(req.query.q || '');
  const country = String(req.query.country || '');
  const page = Number(req.query.page || 1);

  let cities: any[] = [];

  if (geoApiKey) {
    try {
      const geoResponse = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
        headers: { 'X-RapidAPI-Key': geoApiKey, 'X-RapidAPI-Host': geoApiHost },
        params: { namePrefix: query, countryIds: country, limit: 12, offset: (page - 1) * 12, sort: '-population' }
      });

      cities = await Promise.all(geoResponse.data.data.map(async (city: any) => {
        const countryData = await axios.get(`${countryUrl}${city.countryCode}`).then((response) => response.data).catch(() => []);
        const weather = weatherKey ? await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: { lat: city.latitude, lon: city.longitude, appid: weatherKey, units: 'metric' }
        }).then((response) => ({ temp: response.data.main.temp, condition: response.data.weather[0].main })).catch(() => fallbackWeather) : fallbackWeather;

        return {
          externalCityId: String(city.id),
          name: city.city,
          region: city.region,
          country: city.country,
          latitude: city.latitude,
          longitude: city.longitude,
          averageCost: 100 + Math.round(city.population / 20000),
          popularityScore: Math.min(99, Math.round(city.population / 20000 + 20)),
          image: `https://images.unsplash.com/photo-1506976785307-8732e854ad5d?auto=format&fit=crop&w=900&q=60&city=${encodeURIComponent(city.city)}`,
          weather,
          currency: countryData[0]?.currencies ? Object.keys(countryData[0].currencies)[0] : 'USD'
        };
      }));
    } catch (_error) {
      cities = [];
    }
  }

  if (!cities.length) {
    const persisted = await prisma.city.findMany({
      where: {
        AND: [
          query ? { name: { contains: query } } : {},
          country ? { country: { contains: country } } : {}
        ]
      },
      orderBy: [{ popularityScore: 'desc' }, { createdAt: 'desc' }],
      take: 12
    });

    cities = persisted.length
      ? await Promise.all(persisted.map(enrichCity))
      : await Promise.all(fallbackCities.filter((city) => {
          const matchesQuery = !query || city.name.toLowerCase().includes(query.toLowerCase());
          const matchesCountry = !country || city.country.toLowerCase().includes(country.toLowerCase());
          return matchesQuery && matchesCountry;
        }).map(enrichCity));
  }

  res.json({ cities });
};

export const getCountryList = async (_req: Request, res: Response) => {
  let countries: { code: string; name: string }[] = [];

  try {
    const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2');
    countries = response.data.map((entry: any) => ({ code: entry.cca2, name: entry.name.common }));
  } catch (_error) {
    const cityCountries = await prisma.city.findMany({ select: { country: true }, distinct: ['country'] });
    countries = cityCountries.map((entry) => ({ code: entry.country.slice(0, 2).toUpperCase(), name: entry.country }));
  }

  res.json({ countries });
};

export const saveCity = async (req: Request, res: Response) => {
  const cityData = req.body;
  const city = await prisma.city.upsert({
    where: { externalCityId: cityData.externalCityId },
    update: cityData,
    create: cityData
  });
  res.json({ city });
};
