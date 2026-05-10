import { Request, Response } from 'express';
import axios from 'axios';
import prisma from '../prisma';

const geoApiHost = 'wft-geo-db.p.rapidapi.com';
const geoApiKey = process.env.GEODB_API_KEY;
const weatherKey = process.env.OPENWEATHER_API_KEY;
const countryUrl = 'https://restcountries.com/v3.1/alpha/';

export const searchCities = async (req: Request, res: Response) => {
  const query = String(req.query.q || '');
  const country = String(req.query.country || '');
  const page = Number(req.query.page || 1);

  const geoResponse = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities`, {
    headers: { 'X-RapidAPI-Key': geoApiKey, 'X-RapidAPI-Host': geoApiHost },
    params: { namePrefix: query, countryIds: country, limit: 12, offset: (page - 1) * 12, sort: '-population' }
  });

  const cities = await Promise.all(geoResponse.data.data.map(async (city: any) => {
    const countryCode = city.countryCode;
    const countryData = await axios.get(`${countryUrl}${countryCode}`);
    const weather = weatherKey ? await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: { lat: city.latitude, lon: city.longitude, appid: weatherKey, units: 'metric' }
    }).then((response) => response.data).catch(() => null) : null;

    return {
      externalCityId: city.id,
      name: city.city,
      region: city.region,
      country: city.country,
      countryCode,
      latitude: city.latitude,
      longitude: city.longitude,
      population: city.population,
      image: `https://images.unsplash.com/photo-1506976785307-8732e854ad5d?auto=format&fit=crop&w=900&q=60&city=${encodeURIComponent(city.city)}`,
      averageCost: 100 + Math.round(city.population / 20000),
      popularityScore: Math.min(99, Math.round(city.population / 20000 + 20)),
      weather: weather ? { temp: weather.main.temp, condition: weather.weather[0].main } : null,
      currency: countryData.data[0]?.currencies ? Object.keys(countryData.data[0].currencies)[0] : 'USD'
    };
  }));

  res.json({ cities });
};

export const getCountryList = async (_req: Request, res: Response) => {
  const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2');
  const countries = response.data.map((entry: any) => ({ code: entry.cca2, name: entry.name.common }));
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
