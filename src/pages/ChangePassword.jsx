
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const email = params.get('email');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('Missing token in URL');
    }
    if (!email) {
      setStatus('error');
      setMessage('Missing email in URL');
    }
  }, [token]);

  async function submit(e) {
    e.preventDefault();
    if (password.length < 8) {
      setStatus('error');
      setMessage('Password must be at least 8 characters');
      return;
    }
    if (password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match');
      return;
    }
    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URI}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, newPassword: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.message || 'Failed');
      }
      setStatus('success');
      setMessage('');
      toast.success(data?.message || 'Password changed! You can sign in now.', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/login'), 2200);
    } catch (err) {
      setStatus('error');
      setMessage(err?.message || 'Failed');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-200">
        <div className="flex flex-col items-center mb-6">
          <svg className="w-16 h-16 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2V7a2 2 0 10-4 0v2c0 1.104.896 2 2 2zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a6 6 0 1112 0z" />
          </svg>
          <h2 className="text-3xl font-extrabold text-green-700 mb-1">Change Password</h2>
          <p className="text-green-600 text-sm">Secure your account by updating your password</p>
        </div>
        <form onSubmit={submit} className="space-y-5">
          <div>
            <label htmlFor="newPassword" className="block text-green-700 font-semibold mb-2">New Password <span className="text-red-500">*</span></label>
            <input
              id="newPassword"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-green-400"
              required
              placeholder="Enter your new password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-green-700 font-semibold mb-2">Confirm Password <span className="text-red-500">*</span></label>
            <input
              id="confirmPassword"
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 bg-green-50 placeholder-green-400"
              required
              placeholder="Re-enter new password"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 ${status === 'loading' ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Changing...
              </span>
            ) : (
              "Change Password"
            )}
          </button>
          {status === 'error' && message && (
            <div className="text-sm text-center mt-2 font-semibold text-red-600 animate-pulse">{message}</div>
          )}
        </form>
        <div className="mt-6 text-center text-green-500 text-xs">* All fields are required</div>
        <ToastContainer />
      </div>
    </div>
  );
}

