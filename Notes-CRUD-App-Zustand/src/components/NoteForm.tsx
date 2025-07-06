import {
   useEffect,
   useState
}

from 'react';

import {
   useNotesStore,
   type Note
}

from '../store';

type Props= {
   editingNote?: Note,
      onSubmit?: ()=> void
}

;

export default function NoteForm( {
      editingNote, onSubmit
   }

   : Props) {
   const [title,
   setTitle]=useState('');
   const [content,
   setContent]=useState('');
   const addNote=useNotesStore((state)=> state.addNote);
   const updateNote=useNotesStore((state)=> state.updateNote);

   useEffect(()=> {
         if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
         }

         else {
            setTitle('');
            setContent('');
         }
      }

      , [editingNote]);

   const handleSubmit=(e: React.FormEvent)=> {
      e.preventDefault();
      if ( !title.trim() || !content.trim()) return;

      if (editingNote) {
         updateNote( {
               id: editingNote.id, title, content
            }

         );
      }

      else {
         addNote( {
               title, content, id: Date.now().toString()
            }

         );
      }

      setTitle('');
      setContent('');
      onSubmit?.();
   }

   ;

   return (<form onSubmit= {
         handleSubmit
      }

      className="p-6 max-w-2xl mx-auto mb-6"> <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center"> {
         editingNote ? 'Edit Note' : 'Add Note'
      }

      </h2> <div className="flex flex-col gap-[10px]">
        <input
          type="text"
          placeholder="Title"
          className="bg-zinc-800 text-zinc-100 placeholder-zinc-400 border border-zinc-700 px-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 transition min-h-[30px] rounded-[5px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="bg-zinc-800 text-zinc-100 placeholder-zinc-400 border border-zinc-700 px-4 py-2 text-base min-h-[48px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition rounded-[5px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition shadow w-full"
        >
          {editingNote ? 'Save' : 'Create'}
        </button>
      </div> </form>);
}