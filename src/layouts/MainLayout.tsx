// import { Outlet } from "react-router-dom";
// import Header from "../components/common/Header";
// import Sidebar from "../components/layout/Sidebar";

// const MainLayout = () => {
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
//       <Sidebar />

//       <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
//         <Header />

//         <div className="flex-1 p-5 md:p-7">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default MainLayout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Header from "../components/common/Header";
import Sidebar from "../components/layout/Sidebar";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        {/* Mobile top bar (sirf mobile pe) */}
        <div className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-white px-4 md:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="rounded-lg p-2 text-gray-700 hover:bg-gray-100"
          >
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800">Bookmark Manager</span>
        </div>

        <Header />

        <div className="flex-1 p-5 md:p-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;