import { useNotesStore } from '../store'

type Props = {
  onEdit: (note: { id: string; title: string; content: string }) => void
}

export default function NotesList({ onEdit }: Props) {
  const notes = useNotesStore((state) => state.notes)
  const deleteNote = useNotesStore((state) => state.deleteNote)

  if (notes.length === 0) {
    return <p className="text-gray-500 pt-4">No notes yet 📝</p>
  }

  return (
    <ul className="grid sm:grid-cols-2 gap-6 pt-4">
      {notes.map((note) => (
        <li key={note.id} className="bg-white p-5 rounded-2xl shadow-lg border space-y-2 flex flex-col min-h-[120px]">
          <h3 className="text-lg font-semibold text-gray-800 break-words">{note.title}</h3>
          <p className="text-gray-700 whitespace-pre-wrap break-words flex-1">{note.content}</p>
          <div className="flex justify-center gap-2 pt-2">
            <button
              onClick={() => onEdit(note)}
              className="text-sm px-4 py-1"
            >
              Edit
            </button>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-sm px-4 py-1"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
