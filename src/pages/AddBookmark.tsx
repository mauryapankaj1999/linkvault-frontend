
import { useNavigate, useParams } from "react-router-dom";
import BookmarkForm from "../components/bookmarks/BookmarkForm";

const EditBookmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex max-w-xl justify-center">
      <BookmarkForm
        bookmarkId={id}
        onUpdated={() => navigate("/bookmarks")}
      />
    </div>
  );
};

export default EditBookmark;
