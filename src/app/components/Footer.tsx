import React from 'react';
import { Link } from 'react-router';
import { Facebook, Instagram, MessageCircle, Twitter, Linkedin, Youtube } from 'lucide-react';
import { Button } from './ui/button';

import { useEffect, useState } from 'react';

const Footer = ({ isAdmin = false }) => {
  const [branding, setBranding] = useState({
    address: '',
    phone: '',
    email: '',
    facebook: 'https://facebook.com/yourpage',
    instagram: 'https://instagram.com/yourpage',
    youtube: 'https://youtube.com/yourchannel',
    twitter: 'https://twitter.com/yourprofile',
    whatsapp: 'https://wa.me/yourphonenumber',
  });
  useEffect(() => {
    fetch('http://localhost:5000/api/branding')
      .then(res => res.json())
      .then(data => setBranding(prev => ({ ...prev, ...data })))
      .catch(() => { });
  }, []);
  return (
    <footer className="relative overflow-hidden bg-[#3a4a3e] text-[#efece6]">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(180deg, rgba(7,12,9,0.7) 0%, rgba(7,12,9,0.2) 35%, rgba(7,12,9,0.6) 100%), radial-gradient(circle at 15% 80%, rgba(90,110,90,0.35), transparent 55%), radial-gradient(circle at 85% 15%, rgba(90,110,90,0.25), transparent 50%)' }} />
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(235,230,220,0.08)_1px,transparent_1px)] bg-[size:220px_100%]" />
      <div className="relative max-w-7xl mx-auto px-6 py-10 md:py-12">
        {!isAdmin ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* ...existing code... (user footer content) */}
            <div>
              <h2 className="text-2xl mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                On Earth
              </h2>
              <nav className="space-y-2">
                {[
                  { label: 'Rooms', to: '/rooms' },
                  { label: 'Services', to: '/services' },
                  { label: 'About', to: '/about' },
                  { label: 'Contact', to: '/contact' },
                  { label: 'Blog', to: '/blog' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block text-sm text-[#d2cdbf] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-[#d2cdbf]">
                <li>
                  <Link to="/profile?tab=bookings" className="hover:text-white transition-colors">
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="hover:text-white transition-colors">
                    Special Offers
                  </Link>
                </li>
                <li>51 Rooms & 26 Suites</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Contact
              </h3>
              <ul className="space-y-2 text-sm text-[#d2cdbf]">
                {branding.address && <li>{branding.address}</li>}
                {branding.phone && <li className="pt-2">{branding.phone}</li>}
                {branding.email && <li>{branding.email}</li>}
                {branding.whatsapp && (
                  <li className="pt-2">
                    <a
                      href={branding.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Connect
              </h3>
              <div className="flex gap-3 mb-4">
                <a
                  href={branding.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={branding.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={branding.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={branding.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
              <Button
                className="bg-[#6b7262] text-[#232a22] hover:bg-[#efece6] hover:text-[#232a22] font-bold uppercase tracking-widest w-full"
                onClick={() => {
                  if (window.location.pathname === '/' || window.location.pathname === '/home') {
                    // Scroll to search bar on Home
                    const searchSection = document.querySelector('section');
                    if (searchSection) {
                      searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  } else {
                    window.location.href = '/#search';
                  }
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Admin Footer Section */}
            <div>
              <h2 className="text-2xl mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Admin Panel
              </h2>
              <nav className="space-y-2">
                {[
                  { label: 'Dashboard', to: '/admin/dashboard' },
                  { label: 'Manage Bookings', to: '/admin/bookings' },
                  { label: 'Manage Rooms', to: '/admin/rooms' },
                  { label: 'Manage Services', to: '/admin/services' },
                  { label: 'Manage Offers', to: '/admin/offers' },
                  { label: 'Manage Newsletters', to: '/admin/newsletters' },
                  { label: 'Manage Contacts', to: '/admin/contacts' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="block text-sm text-[#d2cdbf] hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Quick Admin Links
              </h3>
              <ul className="space-y-2 text-sm text-[#d2cdbf]">
                <li>
                  <Link to="/admin/bookings" className="hover:text-white transition-colors">
                    All Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/admin/service-bookings" className="hover:text-white transition-colors">
                    Service Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/admin/offers" className="hover:text-white transition-colors">
                    All Offers
                  </Link>
                </li>
                <li>
                  <Link to="/admin" state={{ tab: 'settings' }} className="hover:text-white transition-colors">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/" state={{ tab: 'settings' }} className="hover:text-white transition-colors">
                    Back to Website
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Hotel Info
              </h3>
              <ul className="space-y-2 text-sm text-[#d2cdbf]">
                {branding.address && <li>{branding.address}</li>}
                {branding.phone && <li className="pt-2">{branding.phone}</li>}
                {branding.email && <li>{branding.email}</li>}
              </ul>
            </div>
            <div>
              <h3 className="text-lg mb-4 text-[#efece6]" style={{ fontFamily: "'Playfair Display', serif" }}>
                Admin Connect
              </h3>
              <div className="flex gap-3 mb-4">
                <a
                  href={branding.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={branding.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={branding.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={branding.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[#6c7564] justify-between items-center flex-col md:flex-row flex">
          <p className="text-lg text-[#a9a492] mr-4">© {new Date().getFullYear()} Alphanexis Technologies PVT.Ltd . All rights reserved.</p>
          <div className="flex gap-3 ml-4">
            <a
              href="https://www.linkedin.com/company/alphanexis/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/yourpage"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/people/AlphaNexis/61562936054548/?rdid=vrnyFSNe5naB2gz7&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1My4zij8wm%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/8817617752"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-[#6c7564] flex items-center justify-center hover:border-[#efece6] hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
