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
  const [open, setOpen] = useState(false);

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
    <div>
      {/* Notification Bell Floating Button */}
      <button
        className="fixed z-50 bottom-8 right-8 bg-[#232b23] hover:bg-[#3f4a40] text-[#efece6] rounded-full shadow-lg w-14 h-14 flex items-center justify-center border-2 border-[#5b6659] focus:outline-none"
        onClick={() => setOpen((v) => !v)}
        aria-label="Show notifications"
      >
        <span className="relative">
          <FaBell size={28} color="#fbbf24" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold border-2 border-[#232b23]">{unreadCount}</span>
          )}
        </span>
      </button>

      {/* Popover Notification Panel */}
      {open && (
        <div className="fixed z-50 bottom-28 right-8 w-[420px] max-w-[95vw] bg-white text-[#232b23] rounded-2xl shadow-xl border border-[#ececec] p-0 animate-fade-in" style={{ minWidth: 340 }}>
          <div className="flex items-center px-6 pt-5 pb-2 border-b border-[#f3f3f3]">
            <FaBell color="#fbbf24" size={22} className="mr-2" />
            <span className="text-lg font-semibold">Notifications</span>
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">{unreadCount}</span>
            )}
            <button
              className="ml-auto text-[#b6b6b6] hover:text-[#232b23] text-xl px-2"
              onClick={() => setOpen(false)}
              aria-label="Close notifications"
            >
              <FaTimes />
            </button>
          </div>
          <div className="max-h-[340px] overflow-y-auto px-2 py-2">
            {notifications.length === 0 ? (
              <div className="text-[#b6b6b6] text-center py-8">No notifications</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-3 px-5 py-4 rounded-xl mb-2 border transition-colors ${n.read ? 'bg-[#f8fafc] border-[#eaeaea]' : 'bg-[#fffbe6] border-[#ffe58f]'} relative`}
                >
                  <div className="mt-1">{notificationIcons[n.type]}</div>
                  <div className="flex-1">
                    <div className="font-medium text-[#232b23]">{n.title}</div>
                    <div className="text-sm text-[#444]">{n.description}</div>
                    <div className="text-xs text-[#888] mt-1">{n.time}</div>
                  </div>
                  <div className="flex flex-col gap-1 ml-2">
                    {!n.read && (
                      <button
                        title="Mark as read"
                        onClick={() => markAsRead(n.id)}
                        className="text-green-500 hover:text-green-600 bg-transparent rounded p-1"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      title="Delete"
                      onClick={() => deleteNotification(n.id)}
                      className="text-[#b6b6b6] hover:text-red-400 bg-transparent rounded p-1"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-2 text-center pb-2">
            <a href="#" className="text-blue-600 hover:underline text-xs font-medium flex items-center justify-center gap-1">
              View all notifications <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;