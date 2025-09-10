import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar";
import axios from 'axios';
import NoteCard from '../components/NoteCard';
import { useAuth } from "../Context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner"; 

const NotesModel = lazy(() => import('../components/NotesModel'));

function Home() {
  const { user } = useAuth(); 
  const navigate = useNavigate();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [filteredNotes,setFilteredNotes]=useState([])
  const [notes, setNotes] = useState([]);
  const [currtNote, setCurrtNote] = useState(null);
const [query,setQuery]=useState("");
  // ✅ Moved fetchNotes outside so it can be reused
const fetchNotes = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/note", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ token pass karo
      },
    });
    setNotes(data.notes);
  } catch (error) {
    toast.error(error.response?.data?.message || "❌ Failed to fetch notes");
    console.log(error.response?.data?.message || error.message);
  }
};


  useEffect(() => {
    if(user){
    fetchNotes();}
  }, []);

  useEffect(()=>{
    (setFilteredNotes(notes.filter((note)=>note.title.toLowerCase().includes(query.toLowerCase())||note.description.toLowerCase().includes(query.toLowerCase()))))
},[query,notes])
useEffect(() => {
    if (!user) {
      setNotes([]);
      setFilteredNotes([]);
    }
  }, [user]);

  const closeModel = () => {
    setIsModelOpen(false);
   
  };

  const onEdit = (note) => {
    setCurrtNote(note);
    setIsModelOpen(true);
  };

  const addNote = async (title, description) => {
if (!user) {
    toast.error("⚠️ First you should login to add a note");
    navigate("/login"); 
    return;
  }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
         toast.success("✅ Note added successfully!");
      }
    } catch (error) {
       toast.error(error.response?.data?.message || "❌ Failed to add note");
    }
  };

  const editNote= async(id,title,description)=>{
     try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.data.success) {
        fetchNotes();
        closeModel();
         toast.success("✏️ Note updated successfully!");
      }
    } catch (error) {
        toast.error(error.response?.data?.message || "❌ Failed to update note");
    }
  }

  const deleteNote=async (id)=>{
      try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
       
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
console.log("Token from localStorage:", localStorage.getItem("token"));
      if (response.data.success) {
        fetchNotes();
 toast.info("🗑️ Note deleted successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "❌ Failed to delete note");
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery}/>
      <div className="px-8 pt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {user ? (
  filteredNotes.length > 0 ? (
    filteredNotes.map((note) => (
      <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
    ))
  ) : (
    <p>No notes yet</p>
  )
) : (
  <p className="text-center w-full text-gray-600 font-medium">
    Please login to see your notes
  </p>
)}

      </div>
      <button
        onClick={() => setIsModelOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {isModelOpen && (
         <Suspense fallback={<Spinner />}>
        <NotesModel
          closeModel={closeModel}
          addNote={addNote}
          currtNote={currtNote}
          editNote={editNote}
        />
 </Suspense>
      )}
    </div>
  );
}

export default Home;
