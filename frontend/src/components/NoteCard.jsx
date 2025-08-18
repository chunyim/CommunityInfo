import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import api from "../lib/axios";

const NoteCard = ({ note, setNotes }) => {
  const navigate = useNavigate();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      // onClick={() => navigate(`/note/${note._id}`)}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#0c4262]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/80 line-clamp-3">{note.content}</p>
        {/* Optional fields */}
        <div className="text-sm text-base-content/60 mt-2">
          {note.serviceProvider && <span>{note.serviceProvider}</span>}
          {note.phoneContact && <span> • {note.phoneContact}</span>}
          {note.webOrEmailContact && <span> • {note.webOrEmailContact}</span>}
        </div>

        <div className="card-actions justify-between items-center mt-4">
          <span className="text-m text-base-content/100">{note.category}</span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-ghost btn-xs"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/note/${note._id}`);
              }}
              aria-label="Edit note"
            >
              <PenSquareIcon size={16} />
            </button>
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, note._id)}
              aria-label="Delete note"
            >
              <Trash2Icon size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
