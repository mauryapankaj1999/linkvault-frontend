import { NavLink } from "react-router-dom";
import { Bookmark, Home, Plus, Scroll, X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
      isActive
        ? "bg-teal-50 text-teal-900 font-semibold"
        : "text-gray-600 hover:bg-gray-50"
    }`;

  return (
    <>
      {/* Overlay (sirf mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[99] bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-[100] flex w-64 shrink-0 flex-col border-r bg-white transition-transform duration-300 md:sticky md:top-0 md:z-auto md:h-screen md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-teal-800 p-2 text-white">
              <Bookmark size={21} />
            </div>
            <h1 className="text-lg font-bold">Bookmark Manager</h1>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          <NavLink to="/bookmarks" end className={navClass} onClick={onClose}>
            <Home size={19} />
            All Bookmarks
          </NavLink>

          <NavLink to="/bookmarks/new" className={navClass} onClick={onClose}>
            <Plus size={19} />
            Add Bookmark
          </NavLink>

          <NavLink to="/bookmarks/list" className={navClass} onClick={onClose}>
            <Scroll size={19} />
            Bookmark List
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="shrink-0 border-t p-4 text-xs text-gray-400"></div>
      </aside>
    </>
  );
};

export default Sidebar;