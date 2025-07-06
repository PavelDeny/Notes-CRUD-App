import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Тип для нотатки
export type Note = {
  id: string
  title: string
  content: string
}

// Тип для стану
type NotesState = {
  notes: Note[]
  addNote: (note: Note) => void
  updateNote: (note: Note) => void
  deleteNote: (id: string) => void
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],

      // Додавання нової нотатки
      addNote: (note) => {
        set({ notes: [...get().notes, note] })
      },

      // Оновлення існуючої нотатки
      updateNote: (updatedNote) => {
        set({
          notes: get().notes.map((n) =>
            n.id === updatedNote.id ? updatedNote : n
          ),
        })
      },

      // Видалення нотатки
      deleteNote: (id) => {
        set({
          notes: get().notes.filter((n) => n.id !== id),
        })
      },
    }),
    {
      name: 'notes-storage', // ключ в localStorage
    }
  )
)
