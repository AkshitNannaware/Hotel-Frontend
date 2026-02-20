import React, { useState } from 'react';
import { FaBell, FaCheck, FaTimes, FaUserPlus, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

interface Notification {
  id: string;
  type: 'sale' | 'order' | 'user';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notificationIcons = {
  sale: <FaShoppingCart color="#eab308" size={20} />,
  order: <FaClipboardList color="#22c55e" size={20} />,
  user: <FaUserPlus color="#3b82f6" size={20} />,
};

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'sale',
    title: 'New Sale Created',
    description: 'Sale INV-20260219-454 completed successfully',
    time: '21 hours ago',
    read: false,
  },
  {
    id: '2',
    type: 'order',
    title: 'New Order Received',
    description: 'Order ORD-MLT4VRP0-K4FX has been created',
    time: '1 day ago',
    read: false,
  },
  {
    id: '3',
    type: 'user',
    title: 'New User Added',
    description: 'Akshit (akshit@gmail.com) has been added as manager',
    time: '1 day ago',
    read: true,
  },
];

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-lg p-6 relative">
      <div className="flex items-center mb-4">
        <span style={{ marginRight: 8, display: 'inline-flex', verticalAlign: 'middle' }}><FaBell color="#fbbf24" size={24} /></span>
        <span className="text-xl font-semibold">Notifications</span>
        {unreadCount > 0 && (
          <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">{unreadCount}</span>
        )}
      </div>
      <div>
        {notifications.length === 0 ? (
          <div className="text-gray-500 text-center py-8">No notifications</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`flex items-start gap-3 p-3 rounded-lg mb-2 border ${n.read ? 'bg-gray-50' : 'bg-yellow-50 border-yellow-200'} relative`}
            >
              <div className="mt-1">{notificationIcons[n.type]}</div>
              <div className="flex-1">
                <div className="font-medium">{n.title}</div>
                <div className="text-sm text-gray-600">{n.description}</div>
                <div className="text-xs text-gray-400 mt-1">{n.time}</div>
              </div>
              <div className="flex flex-col gap-1 ml-2">
                {!n.read && (
                  <button
                    title="Mark as read"
                    onClick={() => markAsRead(n.id)}
                    style={{ color: '#22c55e', background: 'none', borderRadius: 4, padding: 4 }}
                  >
                    <FaCheck />
                  </button>
                )}
                <button
                  title="Delete"
                  onClick={() => deleteNotification(n.id)}
                  style={{ color: '#9ca3af', background: 'none', borderRadius: 4, padding: 4 }}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-blue-600 hover:underline text-sm font-medium">View all notifications</a>
      </div>
    </div>
  );
};

export default Notifications;