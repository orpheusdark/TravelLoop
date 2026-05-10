import { useEffect, useState } from 'react';
import { searchCities, fetchCountries } from '../services/cities';
import { useDebounce } from '../hooks/useDebounce';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

const DiscoverPage = () => {
  const [query, setQuery] = useState('');
  const [country, setCountry] = useState('');
  const [cities, setCities] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    fetchCountries().then((data) => setCountries(data.countries)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setCities([]);
      return;
    }
    searchCities(debouncedQuery, country).then((data) => setCities(data.cities)).catch(console.error);
  }, [country, debouncedQuery]);

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-soft">
        <h1 className="text-3xl font-semibold text-slate-950">Discover cities</h1>
        <p className="mt-3 text-slate-600">Search real travel destinations with weather previews, cost estimates and curated profiling.</p>
      </div>

      <Card className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cities" />
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" value={country} onChange={(event) => setCountry(event.target.value)}>
            <option value="">All countries</option>
            {countries.map((item) => (<option key={item.code} value={item.code}>{item.name}</option>))}
          </select>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {cities.map((city) => (
          <Card key={city.externalCityId} className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="relative flex flex-col gap-4">
              <div className="h-48 rounded-[24px] bg-cover bg-center" style={{ backgroundImage: `url(${city.image})` }} />
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-white">{city.name}</h2>
                <p className="text-sm text-slate-200">{city.country}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Cost</p>
                  <p className="mt-2 text-lg font-semibold">${city.averageCost}/day</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Popularity</p>
                  <p className="mt-2 text-lg font-semibold">{city.popularityScore}%</p>
                </div>
                <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Weather</p>
                  <p className="mt-2 text-lg font-semibold">{city.weather?.temp ?? '--'}°C</p>
                </div>
              </div>
              <Button className="mt-2 w-fit">Add to trip</Button>
            </div>
          </Card>
        ))}
      </div>
      {!cities.length && debouncedQuery && <p className="text-center text-slate-500">No cities found, try another destination.</p>}
    </div>
  );
};

export default DiscoverPage;
