import React, { useState } from 'react';
import { firebaseapp } from '../firebase/config';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Estados para login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Estados para registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const auth = getAuth(firebaseapp);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log("User signed in:", userCredential.user);
      const token = await userCredential.user.getIdToken()
      // Almacena el token y redirige
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      setError('Error al iniciar sesión');
      throw error;
    } finally {
      setLoading(false);
    }
    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email: loginEmail,
    //       password: loginPassword
    //     })
    //   });
    //   if (!response.ok) {
    //     const data = await response.json();
    //     setError(data.message || 'Error al iniciar sesión');
    //   } else {
    //     const data = await response.json();
    //     // Almacena el token y redirige
    //     localStorage.setItem('token', data.token);
    //     window.location.href = '/';
    //   }
    // } catch (error) {
    //   setError('Error de red, inténtalo de nuevo.');
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (registerPassword !== registerConfirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    const auth = getAuth(firebaseapp);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await updateProfile(userCredential.user, { displayName: registerName });
      console.log("User registered:", userCredential.user);
      const token = await userCredential.user.getIdToken()
      // Almacena el token y redirige
      localStorage.setItem('token', token);
      window.location.href = '/';
    } catch (error) {
      setError('Error al registrar usuario');
      throw error;
    } finally {
      setLoading(false);
    }

    // try {
    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       name: registerName,
    //       email: registerEmail,
    //       password: registerPassword
    //     })
    //   });
    //   if (!response.ok) {
    //     const data = await response.json();
    //     setError(data.message || 'Error al registrarse');
    //   } else {
    //     const data = await response.json();
    //     localStorage.setItem('token', data.token);
    //     window.location.href = '/';
    //   }
    // } catch (error) {
    //   setError('Error de red, inténtalo de nuevo.');
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <div className="flex justify-center mb-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => { setActiveTab('login'); setError(''); }}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
          onClick={() => { setActiveTab('register'); setError(''); }}
        >
          Sign Up
        </button>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {activeTab === 'login' ? (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="loginEmail" className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              id="loginEmail"
              name="loginEmail"
              className="w-full border rounded px-3 py-2"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="loginPassword" className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              className="w-full border rounded px-3 py-2"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? 'Cargando...' : 'Login'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label htmlFor="registerName" className="block font-semibold mb-1">Nombre Completo</label>
            <input
              type="text"
              id="registerName"
              name="registerName"
              className="w-full border rounded px-3 py-2"
              value={registerName}
              onChange={e => setRegisterName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="registerEmail" className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              id="registerEmail"
              name="registerEmail"
              className="w-full border rounded px-3 py-2"
              value={registerEmail}
              onChange={e => setRegisterEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="registerPassword" className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              id="registerPassword"
              name="registerPassword"
              className="w-full border rounded px-3 py-2"
              value={registerPassword}
              onChange={e => setRegisterPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="registerConfirmPassword" className="block font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              id="registerConfirmPassword"
              name="registerConfirmPassword"
              className="w-full border rounded px-3 py-2"
              value={registerConfirmPassword}
              onChange={e => setRegisterConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            {loading ? 'Cargando...' : 'Sign Up'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
