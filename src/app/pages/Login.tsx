import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const identifier = loginMethod === 'email' ? email : phone;
    const success = await login(identifier, password);
    if (success) {
      toast.success('Login successful!');
      // Check user role from localStorage (set by AuthContext)
      const auth = localStorage.getItem('auth');
      let isAdmin = false;
      if (auth) {
        try {
          const parsed = JSON.parse(auth);
          isAdmin = parsed.user?.role === 'admin';
        } catch {}
      }
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100 px-4">
      <div className="w-full max-w-lg">
        <div className="bg-white/90 rounded-[2.5rem] shadow-2xl p-12 border border-[#ececec] backdrop-blur-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-2 font-bold tracking-tight">Welcome Back</h1>
            <p className="text-stone-500 text-lg">Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 p-1 bg-stone-100 rounded-xl mb-8">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-lg font-medium transition-all ${
                  loginMethod === 'email' ? 'bg-white shadow-md' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl text-lg font-medium transition-all ${
                  loginMethod === 'phone' ? 'bg-white shadow-md' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
            </div>

            {loginMethod === 'email' ? (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-14 rounded-xl border-2 border-[#ececec] bg-white/80 text-lg px-5 focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-2 h-14 rounded-xl border-2 border-[#ececec] bg-white/80 text-lg px-5 focus:ring-2 focus:ring-amber-400"
                  required
                />
              </div>
            )}

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-2">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 pr-12 rounded-xl border-2 border-[#ececec] bg-white/80 text-lg px-5 focus:ring-2 focus:ring-amber-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-base">
                <input type="checkbox" className="w-5 h-5 rounded border-stone-300" />
                <span className="text-stone-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-stone-900 hover:underline text-base">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-base">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-stone-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-stone-900 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
