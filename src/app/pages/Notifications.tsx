import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, User, ShoppingCart, Package, Store } from 'lucide-react';
import { Button } from '../components/ui/button';

function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return date.toLocaleDateString();
}

function getNotificationIcon(type: string) {
  switch (type) {
    case 'order':
      return <ShoppingCart className="w-6 h-6 text-blue-500" />;
    case 'sale':
      return <CheckCircle className="w-6 h-6 text-yellow-500" />;
    case 'inventory':
      return <Package className="w-6 h-6 text-green-500" />;
    case 'franchise':
      return <Store className="w-6 h-6 text-purple-500" />;
    case 'user':
      return <User className="w-6 h-6 text-pink-500" />;
    default:
      return <Bell className="w-6 h-6 text-gray-400" />;
  }
}


const Notifications = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      try {
        const token = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')!).token : null;
        const res = await fetch('/api/notifications', {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const data = await res.json();
        setNotifications(data);
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    }
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f1210] text-[#efece6] flex flex-col items-center py-10">
      <h1 className="text-3xl mb-6 flex items-center gap-2"><Bell className="w-7 h-7" /> Notifications</h1>
      {loading ? (
        <div>Loading notifications...</div>
      ) : notifications.length === 0 ? (
        <div>No notifications found.</div>
      ) : (
        <div className="w-full max-w-2xl">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-lg font-semibold">Notifications</span>
            <span className="bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">{notifications.length}</span>
          </div>
          {notifications.map((n, idx) => (
            <div
              key={idx}
              className={`rounded-xl border-l-4 bg-[#232b23] p-4 mb-3 shadow flex items-start gap-4 border-yellow-400`}
            >
              <div className="flex flex-col items-center justify-center mr-2">
                {getNotificationIcon(n.type)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-lg mb-1">{n.title}</div>
                <div className="text-sm text-[#c9c3b6] mb-2">{n.message}</div>
                <div className="text-xs text-[#9aa191]">{timeAgo(n.createdAt)}</div>
              </div>
              <div className="flex flex-col items-center gap-2 ml-2">
                <Button size="icon" variant="ghost" title="Mark as read">
                  <span role="img" aria-label="check">✔️</span>
                </Button>
                <Button size="icon" variant="ghost" title="Delete notification">
                  <span role="img" aria-label="delete">❌</span>
                </Button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-center">
            <Button variant="link" className="text-blue-400 text-sm">View all notifications &rarr;</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;