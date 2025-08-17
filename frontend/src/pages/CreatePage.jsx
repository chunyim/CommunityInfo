import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import api from "../lib/axios";

const categories = [
  "legal services",
  "mental health support",
  "tax clinic",
  "help with application",
  "food banks",
  "employment agency",
  "free clothing",
  "itinerary services in WPESS",
  "emergency shelters",
  "clinics for uninsured",
  "others",
];

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [serviceProvider, setServiceProvider] = useState("");
  const [content, setContent] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const [webOrEmailContact, setWebOrEmailContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !category.trim() || !content.trim()) {
      toast.error("Title, Category, and Content are required!");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        category,
        serviceProvider,
        content,
        phoneContact,
        webOrEmailContact,
      });

      toast.success("Note created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response.status === 429) {
        toast.error("Slow down! You're creating notes too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>

              <form onSubmit={handleSubmit}>
                {/* Title */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title *</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                {/* Category */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Category *</span>
                  </label>
                  <select
                    className="select select-bordered"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Provider (optional) */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Service Provider</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Organization or Provider"
                    className="input input-bordered"
                    value={serviceProvider}
                    onChange={(e) => setServiceProvider(e.target.value)}
                  />
                </div>

                {/* Content */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content *</span>
                  </label>
                  <textarea
                    placeholder="Write your note here..."
                    className="textarea textarea-bordered h-32"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                {/* Phone Contact (optional) */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Phone Contact</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 416-555-1234"
                    className="input input-bordered"
                    value={phoneContact}
                    onChange={(e) => setPhoneContact(e.target.value)}
                  />
                </div>

                {/* Web/Email Contact (optional) */}
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Web or Email Contact</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Website URL or Email"
                    className="input input-bordered"
                    value={webOrEmailContact}
                    onChange={(e) => setWebOrEmailContact(e.target.value)}
                  />
                </div>

                {/* Submit Button */}
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreatePage;
