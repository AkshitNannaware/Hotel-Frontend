import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const API_BASE = (import.meta.env?.VITE_API_URL as string | undefined) || 'http://localhost:5000';

const AdminSignup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    secret: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/admin-signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Failed to sign up.');
        setLoading(false);
        return;
      }
      if (data.token) {
        localStorage.setItem('auth', JSON.stringify({ token: data.token, user: data.user }));
        toast.success('Admin account created!');
        navigate('/admin');
      } else {
        setError('No token received.');
      }
    } catch (err) {
      setError('Failed to sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#232b23]">
      <form className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-serif mb-6 text-center">Admin Signup</h2>
        <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="mb-4" />
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="mb-4" />
        <Input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="mb-4" />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="mb-4" />
        <Input name="secret" placeholder="Admin Secret/Invite Code" value={form.secret} onChange={handleChange} required className="mb-4" />
        {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
        <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-[#232b23] font-semibold shadow-md py-3" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

export default AdminSignup;
