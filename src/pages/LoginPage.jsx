import { useRef } from "react";
import http from "../plugin/http";
import mainStore from "../store/mainStore";
import CustomFunctions from "../plugin/Functions";

function LoginPage() {
  const { error, setError, setLogged } = mainStore((state) => ({
    error: state.error,
    setError: state.setError,
    setLogged: state.setLogged,
  }));
  const { handleNavigate } = CustomFunctions();
  const nameRef = useRef();
  const passwordRef = useRef();

  async function login() {
    const user = {
      name: nameRef.current.value,
      password: passwordRef.current.value,
    };

    const res = await http.post("/login", user);
    if (res.success) {
      localStorage.setItem("secret", res.secretKey);
      localStorage.setItem("user", user.name);
      setLogged(user.name);
      handleNavigate("/");
    } else {
      setError(res.message);
    }
  }

  return (
    <div className="login d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Login</div>
      <div className="input-box d-flex flex-column">
        <span>Username</span>
        <input type="text" ref={nameRef} />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Password</span>
        <input type="text" ref={passwordRef} />
      </div>
      <div className="error-msg">{error}</div>
      <button className="log-btn" onClick={login}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;
