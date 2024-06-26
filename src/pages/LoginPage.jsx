function LoginPage() {
  return (
    <div className="login d-flex flex-column justify-content-between align-items-center">
      <div className="box-title">Login</div>
      <div className="input-box d-flex flex-column">
        <span>Username</span>
        <input type="text" />
      </div>
      <div className="input-box  d-flex flex-column">
        <span>Password</span>
        <input type="text" />
      </div>
      <div className="error-msg">Error</div>
      <button className="log-btn">Login</button>
    </div>
  );
}

export default LoginPage;
