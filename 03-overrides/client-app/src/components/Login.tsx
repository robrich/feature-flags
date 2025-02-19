import { useState } from 'react';


const Login = function ({name, onLogin, onLogout}) {
  const [ typedName, setTypedName ] = useState('');

  function doLogin(e) {
    e.preventDefault();
    onLogin(typedName);
  }

  function doChange(e) {
    setTypedName(e.target.value);
  }

  return name ? (
    <>
      <div>
        Hello {name}
      </div>
      <button onClick={onLogout}>Logout</button>
    </>
  ) : (
    <form onSubmit={doLogin}>
      <input id="username" placeholder="username" value={typedName} onChange={doChange} />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
