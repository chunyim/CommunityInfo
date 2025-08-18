import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import RateLimitedUI from "../components/RateLimitedUI";
import api from "../lib/axios";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";
import { categories } from "../constants/categories";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("error fetching notes");
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes =
    filterCategory === "all"
      ? notes
          .slice() // create a copy to avoid mutating state
          .sort((a, b) => a.category.localeCompare(b.category))
      : notes
          .filter((note) => note.category === filterCategory)
          .sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="min-h-screen">
      <Navbar
        categories={categories}
        selectedCategory={filterCategory}
        onCategoryChange={setFilterCategory}
      />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading Info ...</div>
        )}

        {!loading && !isRateLimited && filteredNotes.length === 0 && (
          <NotesNotFound />
        )}

        {!loading && !isRateLimited && filteredNotes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
