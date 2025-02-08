import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-4 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Extracurricular Activities
          Registration System. All rights reserved.
        </p>
        <p className="text-sm">
          Contact me at{" "}
          <a
            href="mailto:kibetcaleb@zetech.ac.ke"
            className="text-yellow-400 hover:underline"
          >
            kibetcaleb@zetech.ac.ke
          </a>
        </p>
        <p className="text-sm mt-2">
          <Link
            to="/terms and conditions"
            className="text-yellow-400 hover:underline"
          >
            Terms and Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
