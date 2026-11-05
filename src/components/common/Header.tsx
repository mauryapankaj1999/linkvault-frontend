// import react from "react";
import { Plus,  } from "lucide-react";
import {  useNavigate } from "react-router-dom";


const Header = () => {
      const navigate = useNavigate();
    
    return (
    <header className="sticky h-16 top-0 z-50 flex py-5 items-center justify-between border-b bg-white px-5 md:px-7">
          <h2 className="font-semibold md:hidden">
            Bookmark Manager
          </h2>

          <button
            onClick={() => navigate("/bookmarks/new")}
            className="ml-auto flex items-center gap-2 rounded-lg bg-teal-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-teal-900"
          >
            <Plus size={18} />
            Add Bookmark
          </button>
        </header>
    );
};

export default Header;