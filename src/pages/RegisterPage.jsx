import { useRef } from "react";
import http from "../plugin/http";
import mainStore from "../store/mainStore";

function RegisterPage() {
  const { error, setError } = mainStore((state) => ({
    error: state.error,
    setError: state.setError,
  }));
  const nameRef = useRef();
  const passwordOneRef = useRef();
  const passwordTwoRef = useRef();

  async function createAccount() {
    const user = {
      name: nameRef.current.value,
      passwordOne: passwordOneRef.current.value,
      passwordTwo: passwordTwoRef.current.value,
    };

    const res = await http.post("/createAccount", user);
    console.log(res);
    if (!res.success) {
      setError(res.message);
    }
  }

  return (
    <div className="login d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Create account</div>
      <div className="input-box d-flex flex-column">
        <span>Username</span>
        <input type="text" ref={nameRef} />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Password 1</span>
        <input type="text" ref={passwordOneRef} />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Password 2</span>
        <input type="text" ref={passwordTwoRef} />
      </div>
      <div className="error-msg">{error}</div>
      <button className="log-btn" onClick={createAccount}>
        Register
      </button>
    </div>
  );
}

export default RegisterPage;
