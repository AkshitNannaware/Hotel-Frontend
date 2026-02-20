import React from 'react';
import { FaBell, FaCheck, FaTimes } from 'react-icons/fa';
import { useNotifications } from '../hooks/useNotifications';

const notificationIcons = {
  user: <FaBell color="#3b82f6" size={20} />,
  admin: <FaBell color="#eab308" size={20} />,
  all: <FaBell color="#22c55e" size={20} />,
};
const Notifications: React.FC = () => {
  const { notifications, loading, error } = useNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
          {notifications.length === 0 && !loading ? (
            <div className="text-[#b6b6b6] text-center py-8">No notifications</div>
          ) : (
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li key={n._id} className={`flex items-start gap-3 px-5 py-4 rounded-xl border transition-colors ${n.read ? 'bg-[#f8fafc] border-[#eaeaea]' : 'bg-[#fffbe6] border-[#ffe58f]'} relative`}>
                  <div className="mt-1">{notificationIcons[n.role]}</div>
                  <div className="flex-1">
                    <div className="font-medium text-[#232b23]">{n.title}</div>
                    <div className="text-sm text-[#444]">{n.message}</div>
                    <div className="text-xs text-[#888] mt-1">{new Date(n.createdAt).toLocaleString()}</div>
                  </div>
                  {!n.read && <span className="text-green-500 font-bold ml-2">New</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

export default Notifications;