function RegisterPage() {
  return (
    <div className="login d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Create account</div>
      <div className="input-box d-flex flex-column">
        <span>Username</span>
        <input type="text" />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Password 1</span>
        <input type="text" />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Password 2</span>
        <input type="text" />
      </div>
      <div className="error-msg">Error</div>
      <button className="log-btn">Register</button>
    </div>
  );
}

export default RegisterPage;
