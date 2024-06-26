import { useNavigate } from "react-router-dom";

const CustomFunctions = () => {
  const nav = useNavigate();

  function handleNavigate(path) {
    nav(path);
  }

  function getCurrentPost(img) {
    console.log("current", img);
  }

  return { handleNavigate, getCurrentPost };
};

export default CustomFunctions;
