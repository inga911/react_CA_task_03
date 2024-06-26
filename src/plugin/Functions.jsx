import { useNavigate } from "react-router-dom";
import mainStore from "../store/mainStore";

const CustomFunctions = () => {
  const nav = useNavigate();
  const { setLogged } = mainStore((state) => ({
    setLogged: state.setLogged,
  }));

  function handleNavigate(path) {
    nav(path);
  }

  function logout() {
    localStorage.removeItem("secret");
    localStorage.removeItem("user");
    setLogged(null);
    nav("/");
  }

  return { handleNavigate, logout };
};

export default CustomFunctions;
