import { useEffect, useState } from 'react';
import Button from '../components/ui/button';
import Card from '../components/ui/card';
import Input from '../components/ui/input';

const defaultCategories = ['clothing', 'electronics', 'documents', 'toiletries', 'essentials'];

const PackingPage = () => {
  const [items, setItems] = useState<any[]>([
    { id: 1, title: 'Passport', category: 'documents', packed: false },
    { id: 2, title: 'Travel adapter', category: 'electronics', packed: true },
    { id: 3, title: 'Rain jacket', category: 'clothing', packed: false }
  ]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('essentials');

  useEffect(() => {
    const draft = localStorage.getItem('traveloop_packing');
    if (draft) {
      setItems(JSON.parse(draft));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('traveloop_packing', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!title) return;
    setItems((prev) => [...prev, { id: Date.now(), title, category, packed: false }]);
    setTitle('');
  };

  const togglePacked = (id: number) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  };

  return (
    <div className="space-y-8">
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Packing checklist</h1>
        <p className="mt-3 text-slate-600">Organize items, reuse templates, and track your packing progress before a trip.</p>
      </Card>

      <Card className="space-y-6">
        <div className="grid gap-4 md:grid-cols-[1fr_220px]">
          <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a packing item" />
          <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100" value={category} onChange={(event) => setCategory(event.target.value)}>
            {defaultCategories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
          </select>
        </div>
        <Button onClick={addItem} className="w-full">Add item</Button>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {defaultCategories.map((section) => (
          <Card key={section} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-950">{section}</h2>
              <span className="rounded-3xl bg-slate-100 px-3 py-2 text-sm text-slate-600">{items.filter((item) => item.category === section).length}</span>
            </div>
            <div className="space-y-3">
              {items.filter((item) => item.category === section).map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-4 py-4">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-sm text-slate-500">{item.packed ? 'Packed' : 'Pending'}</p>
                  </div>
                  <Button onClick={() => togglePacked(item.id)} className="bg-slate-900 px-4 text-white hover:bg-slate-800">{item.packed ? 'Unpack' : 'Packed'}</Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PackingPage;
