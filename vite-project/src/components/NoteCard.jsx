import React from 'react'
import {FaEdit,FaTrash} from "react-icons/fa"
function NoteCard({note,onEdit,deleteNote}) {
  return (
   <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-bold text-gray-800">{note.title}</h2>
  <p className="text-gray-600 mt-1">{note.description}</p>
  
  <div className="flex justify-end mt-3 space-x-3">
    <button className="text-blue-500 hover:text-blue-700 transition" onClick={()=>onEdit(note)}>
      <FaEdit size={18} />
    </button>
    <button className="text-red-500 hover:text-red-700 transition" onClick={()=>deleteNote(note._id)}>
      <FaTrash size={18} />
    </button>
  </div>
</div>

  )
}

export default NoteCard
