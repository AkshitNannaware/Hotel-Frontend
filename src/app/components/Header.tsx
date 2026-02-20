import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { Hotel, User, Menu, X, LogIn, LogOut } from 'lucide-react';
import { FaBell, FaCheck, FaTimes, FaUserPlus, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
// Notification pop-up logic and data
const notificationIcons = {
  sale: <FaShoppingCart color="#eab308" size={20} />,
  order: <FaClipboardList color="#22c55e" size={20} />,
  user: <FaUserPlus color="#3b82f6" size={20} />,
};

const initialNotifications = [
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
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const location = useLocation();

  // Hide main nav links on /admin route
  const isAdminDashboard = location.pathname.startsWith('/admin');

  const [notifications, setNotifications] = useState(initialNotifications);
  const [notifOpen, setNotifOpen] = useState(false);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Admin Dashboard Header */}
        {isAdminDashboard ? (
          <nav className="flex items-center gap-12 text-sm uppercase tracking-widest text-white/90 font-bold justify-center pt-2">
            <span onClick={() => navigate('/admin', { state: { tab: 'dashboard' } })} className="hover:text-white transition-colors cursor-pointer">Home</span>
            <span onClick={() => navigate('/admin', { state: { tab: 'rooms' } })} className="hover:text-white transition-colors cursor-pointer">Manage Rooms</span>
            <span onClick={() => navigate('/admin', { state: { tab: 'bookings' } })} className="hover:text-white transition-colors cursor-pointer">Bookings</span>
            <span onClick={() => navigate('/admin', { state: { tab: 'services' } })} className="hover:text-white transition-colors cursor-pointer">Manage Services</span>
            <span onClick={() => navigate('/admin', { state: { tab: 'service-bookings' } })} className="hover:text-white transition-colors cursor-pointer">Service Bookings</span>
            <span onClick={() => navigate('/admin', { state: { tab: 'payments' } })} className="hover:text-white transition-colors cursor-pointer">Payments</span>
            {/* Notification Bell */}
            <button
              className="relative ml-2"
              onClick={() => setNotifOpen((v) => !v)}
              aria-label="Show notifications"
            >
              <FaBell size={22} color="#fbbf24" />
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold border-2 border-[#232b23]">{unreadCount}</span>
              )}
            </button>
          </nav>
        ) : (
          <nav className="flex items-center justify-between lg:justify-center">
            {/* Desktop Navigation (Kept Same) */}
            <>
              <div className="hidden lg:flex items-center gap-12 text-sm uppercase tracking-widest text-white/90 font-bold">
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
                <Link to="/rooms" className="hover:text-white transition-colors">Accommodation</Link>
                <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                <Link to="/offers" className="hover:text-white transition-colors">Offers</Link>
                <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
                {user ? (
                  <>
                    {user.role === 'admin' && (
                      <Link to="/admin" className="hover:text-white transition-colors">Admin Dashboard</Link>
                    )}
                    <Link to="/profile?tab=profile" className="hover:text-white transition-colors">Profile</Link>
                  </>
                ) : (
                  <Link to="/login" className="hover:text-white transition-colors">Login&Signup</Link>
                )}
              </div>
              {/* Notification Bell */}
              <button
                className="relative ml-4"
                onClick={() => setNotifOpen((v) => !v)}
                aria-label="Show notifications"
              >
                <FaBell size={22} color="#fbbf24" />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs font-bold border-2 border-white">{unreadCount}</span>
                )}
              </button>
            </>
          </nav>
        )}

        {/* Notification Popover */}
        {notifOpen && (
          <div className="fixed z-50 top-20 right-8 w-[420px] max-w-[95vw] bg-[#232b23] text-[#efece6] rounded-2xl shadow-2xl border border-[#5b6659] p-0 animate-fade-in" style={{ minWidth: 340 }}>
            <div className="flex items-center px-6 pt-5 pb-2 border-b border-[#3a463a]">
              <FaBell color="#fbbf24" size={22} className="mr-2" />
              <span className="text-lg font-semibold">Notifications</span>
              {unreadCount > 0 && (
                <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">{unreadCount}</span>
              )}
              <button
                className="ml-auto text-[#b6b6b6] hover:text-[#efece6] text-xl px-2"
                onClick={() => setNotifOpen(false)}
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
                    className={`flex items-start gap-3 px-5 py-4 rounded-xl mb-2 border transition-colors ${n.read ? 'bg-[#2e362e] border-[#3a463a]' : 'bg-[#3f4a40]/80 border-amber-200'} relative`}
                  >
                    <div className="mt-1">{notificationIcons[n.type]}</div>
                    <div className="flex-1">
                      <div className="font-medium text-[#efece6]">{n.title}</div>
                      <div className="text-sm text-[#cfc9bb]">{n.description}</div>
                      <div className="text-xs text-[#b6b6b6] mt-1">{n.time}</div>
                    </div>
                    <div className="flex flex-col gap-1 ml-2">
                      {!n.read && (
                        <button
                          title="Mark as read"
                          onClick={() => markAsRead(n.id)}
                          className="text-green-400 hover:text-green-500 bg-transparent rounded p-1"
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
              <a href="#" className="text-amber-400 hover:underline text-xs font-medium flex items-center justify-center gap-1">
                View all notifications <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        )}

        {/* Full Screen Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-[#3f4a40] backdrop-blur-md z-[60] transition-all">
            <div className="flex justify-end p-8">
               <button onClick={() => setMobileMenuOpen(false)} className="text-white border border-white/20 p-3 rounded-full">
                  <X className="w-6 h-6" />
               </button>
            </div>
            <nav className="flex flex-col items-center gap-8 p-6 text-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Home</Link>
              <Link to="/rooms" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Rooms</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Services</Link>
              <Link to="/offers" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Offers</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Contact</Link>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Admin Dashboard</Link>
                  )}
                  <Link to="/profile?tab=profile" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Profile</Link>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light">Login&Signup</Link>
                  <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} className="text-2xl text-white uppercase tracking-widest font-light flex items-center gap-2">
                    <Bell className="w-6 h-6" /> Notifications
                  </Link>
                </>
              )}
              {/* Refresh Button for Mobile */}
              <Button variant="outline" className="w-full max-w-xs" onClick={() => window.location.reload()} title="Refresh Website">
                Refresh
              </Button>
              <div className="w-full h-px bg-white/10 my-4 max-w-xs" />
              {user ? (
                <Button onClick={handleLogout} variant="ghost" className="text-white text-lg">Logout</Button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-white text-lg">Sign In</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;