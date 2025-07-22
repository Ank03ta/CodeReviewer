import { useState } from 'react';
import Login from './Login';
import Register from './Register';

export default function Entry({ onLoginSuccess }) {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className='Entrypage'>
      {showRegister ? (
        <>
          <Register onRegisterSuccess={() => setShowRegister(false)} />
          <p className='ask'>
            Already have an account?{' '}
            <button onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={onLoginSuccess} />
          <p className='ask'>
            Don’t have an account?{' '}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );
}
