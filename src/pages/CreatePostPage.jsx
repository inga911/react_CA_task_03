import { useRef } from "react";
import mainStore from "../store/mainStore";
import CustomFunctions from "../plugin/Functions";
import http from "../plugin/http";

function CreatePostPage() {
  const { error, setError } = mainStore((state) => ({
    error: state.error,
    setError: state.error,
  }));

  const { handleNavigate } = CustomFunctions();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  async function createPost() {
    const newPost = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      secretKey: localStorage.getItem("secret"),
    };

    const res = await http.post("/createPost", newPost);

    if (res.success) {
      handleNavigate("/getAllPosts");
    }
  }

  return (
    <div className="create-post-box login d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Create post</div>
      <div className="input-box d-flex flex-column">
        <span>Title</span>
        <input type="text" ref={titleRef} />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Description</span>
        <input type="text" ref={descriptionRef} />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Image URL</span>
        <input type="text" ref={imageRef} />
      </div>
      <div className="error-msg">{error}</div>
      <button className="log-btn" onClick={createPost}>
        Create Post
      </button>
    </div>
  );
}

export default CreatePostPage;
