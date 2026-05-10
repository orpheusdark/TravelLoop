import { useEffect, useState } from 'react';
import Card from '../components/ui/card';
import Button from '../components/ui/button';
import Input from '../components/ui/input';

const NotesPage = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('traveloop_notes');
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('traveloop_notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (!text) return;
    setNotes([{ id: Date.now(), content: text, createdAt: new Date().toISOString() }, ...notes]);
    setText('');
  };

  return (
    <div className="space-y-8">
      <Card>
        <h1 className="text-3xl font-semibold text-slate-950">Travel notes</h1>
        <p className="mt-3 text-slate-600">Capture itinerary reminders, journal entries, and location-specific details.</p>
      </Card>

      <Card className="space-y-6">
        <Input value={text} onChange={(event) => setText(event.target.value)} placeholder="Write a note" />
        <Button onClick={addNote} className="w-full">Save note</Button>
      </Card>

      <div className="grid gap-6">
        {notes.map((note) => (
          <Card key={note.id}>
            <div className="flex items-center justify-between gap-3 text-slate-500">
              <span>{new Date(note.createdAt).toLocaleString()}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">Trip note</span>
            </div>
            <p className="mt-4 text-slate-700">{note.content}</p>
          </Card>
        ))}
      </div>
      {!notes.length && <p className="text-center text-slate-500">No notes yet — capture your travel thoughts here.</p>}
    </div>
  );
};

export default NotesPage;
