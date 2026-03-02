import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-4 mt-auto text-white bg-gray-800">
      <div className="px-4 mx-auto text-center max-w-7xl">
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
        <p className="mt-2 text-sm">
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
