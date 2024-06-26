import { useEffect, useRef } from "react";
import mainStore from "../store/mainStore";
import http from "../plugin/http";
import CustomFunctions from "../plugin/Functions";

function UpdatePostComponent({ data }) {
  const { setData, error, setError } = mainStore((state) => ({
    setData: state.setData,
    error: state.error,
    setError: state.setError,
  }));

  const { handleNavigate } = CustomFunctions();
  const imageRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (data) {
      imageRef.current.value = data.image;
      titleRef.current.value = data.title;
      descriptionRef.current.value = data.description;
    }
  }, [data]);

  async function handleUpdatePost() {
    const updatedPost = {
      secretKey: localStorage.getItem("secret"),
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      id: data.id,
    };

    const res = await http.post("/updatePost", updatedPost);

    if (res.success) {
      handleNavigate("/getAllPosts");
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="create-post-box login d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Update Post</div>
      <div className="input-box d-flex flex-column">
        <span>Title</span>
        <textarea ref={titleRef}></textarea>
      </div>
      <div className="input-box d-flex flex-column">
        <span>Description</span>
        <textarea ref={descriptionRef}></textarea>
      </div>
      <div className="input-box d-flex flex-column">
        <span>Image URL</span>
        <input type="text" ref={imageRef} />
      </div>
      <div className="error-msg">{error}</div>
      <button className="log-btn" onClick={handleUpdatePost}>
        Update Post
      </button>
    </div>
  );
}

export default UpdatePostComponent;
