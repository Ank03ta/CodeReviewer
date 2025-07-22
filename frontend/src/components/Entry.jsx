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
            <h4 style={{ color: 'white',marginBottom:'15px'}}>Already have an account ?</h4>{' '}
            <button onClick={() => setShowRegister(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <Login onLogin={onLoginSuccess} />
          <p className='ask'>
           <h4 style={{ color: 'white',marginBottom:'15px'}}>Don't have an account ?</h4>{' '}
            <button onClick={() => setShowRegister(true)}>Register</button>
          </p>
        </>
      )}
    </div>
  );
}
