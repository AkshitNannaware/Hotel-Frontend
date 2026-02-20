import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

export interface Notification {
  _id: string;
  userId?: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  role: 'user' | 'admin' | 'all';
}

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);
    // Get token from localStorage
    let token = null;
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        token = parsed.token;
      } catch {}
    }
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/notifications`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Failed to fetch notifications');
        const data = await res.json();
        setNotifications(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  return { notifications, loading, error };
}
