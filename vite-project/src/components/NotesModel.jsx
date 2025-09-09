import { useState,useEffect } from "react";

function NotesModel({closeModel,addNote,currtNote,editNote}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(()=>{
    if(currtNote){
      setTitle(currtNote.title)
      setDescription(currtNote.description)
    }
  },[currtNote])

  const handleSubmit= async(e)=>{
        e.preventDefault()
        if(currtNote){
          editNote(currtNote._id,title,description)
        }
       else{ addNote(title,description)}
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {currtNote ? "Edit Note":"Add New Note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            rows="4"
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-red-500 hover:bg-red-100 transition"
              onClick={closeModel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              {currtNote?"Edit Note":"Add New Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NotesModel;

