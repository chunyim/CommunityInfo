import React from "react";
import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            Community Information Board
          </h1>
          <div className="flex items-center gap-4">
            {/* Filter dropdown */}
            <select
              className="select select-bordered"
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
            >
              <option value="all">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <Link to={"/create"} className="btn btn-primary">
              <PlusIcon className="size-5" />
              <span>New Info</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
