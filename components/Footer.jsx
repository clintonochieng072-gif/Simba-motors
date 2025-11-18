import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Simba Motors</h3>
            <p className="text-gray-300">
              Your trusted partner for quality vehicles on Eldoret Kisumu Road.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/cars" className="hover:text-white transition-colors">
                  Cars
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Vehicle Sales</li>
              <li>Financing</li>
              <li>Trade-ins</li>
              <li>Maintenance</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-2 text-gray-300">
              <p>Eldoret Kisumu Road</p>
              <p>Kenya</p>
              <p>+254 XXX XXX XXX</p>
              <p>info@simbamotors.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Simba Motors. All rights reserved. | Built with passion for
            automotive excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
