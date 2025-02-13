import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
