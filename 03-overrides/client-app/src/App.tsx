import { useState, useEffect } from 'react';
import './App.css';
import Feature1 from '@/components/Feature1';
import Feature2 from '@/components/Feature2';
import Feature3 from '@/components/Feature3';
import Login from '@/components/Login';
import { useFeatureFlags } from '@/hooks/useFeatureFlags';


function App() {
  // FRAGILE: This is not a secure way to authenticate a user
  const [name, setName] = useState<string | undefined>(undefined);
  const { refresh } = useFeatureFlags();

  useEffect(() => {
    refresh(name);
  }, [name]);

  return (
    <>
      <h1>Feature Flags</h1>
      <div className="card">
        <Login name={name} onLogin={setName} onLogout={() => setName(undefined)} />
      </div>
      <div className="card">
        <Feature1 />
      </div>
      <div className="card">
        <Feature2 />
      </div>
      <div className="card">
        <Feature3 />
      </div>
    </>
  );
}

export default App;
