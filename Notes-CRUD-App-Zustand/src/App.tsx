import { useState } from 'react'
import NoteForm from './components/NoteForm'
import NotesList from './components/NotesList'
import type { Note } from './store'

export default function App() {
  const [editingNote, setEditingNote] = useState<Note | undefined>(undefined);

  return (
    <main className="flex items-start justify-center overflow-y-hidden">
      <div className="w-full max-w-[500px] mx-auto space-y-6">
        <NoteForm
          editingNote={editingNote}
          onSubmit={() => setEditingNote(undefined)}
        />
        <NotesList onEdit={setEditingNote} />
      </div>
    </main>
  );
}
