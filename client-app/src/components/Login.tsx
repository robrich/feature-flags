import { useState, type ChangeEvent, type FormEvent } from 'react';

interface LoginProps {
  name?: string;
  onLogin: (name: string) => void;
  onLogout: () => void;
}

const Login = function ({name, onLogin, onLogout}: LoginProps) {
  const [ typedName, setTypedName ] = useState('');

  function doLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onLogin(typedName);
  }

  function doChange(e: ChangeEvent<HTMLInputElement>) {
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
