import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AddBookmark from "./pages/AddBookmark";
import NotFound from "./pages/NotFound";
import AdminBookmarkList from "./components/bookmarks/AdminBookmarkList";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<Navigate to="/bookmarks" replace />}
          />

          <Route path="/bookmarks" element={<Dashboard />} />

          <Route path="/bookmarks/new" element={<AddBookmark />} />
          <Route path="/bookmarks/edit/:id" element={<AddBookmark />} />
          <Route path="/bookmarks/list" element={<AdminBookmarkList />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;