import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen w-full pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-8 px-6 overflow-hidden">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        <div className="prose prose-indigo max-w-none">
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Welcome to the{" "}
            <span className="font-semibold text-indigo-700">
              Extracurricular Activities Registration System
            </span>
            . By accessing or using this System, you agree to comply with and be
            bound by the following terms and conditions. Please read these Terms
            carefully before using the System. If you do not agree to these
            Terms, you must refrain from using the System.
          </p>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Eligibility
            </h2>
            <p className="text-gray-600 mb-4">
              To access and use the System, you must:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-5 marker:text-indigo-500">
              <li>Be a registered student.</li>
              <li>
                Have been provided valid login credentials by the institution or
                its authorized personnel.
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Account Creation and Security
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-5 marker:text-indigo-500">
              <li>
                <span className="font-semibold text-gray-700">Registration:</span>{" "}
                Accounts are created and managed by the institution's ICT
                department.
              </li>
              <li>
                <span className="font-semibold text-gray-700">Login Credentials:</span>{" "}
                You are responsible for maintaining the confidentiality of your
                login credentials.
              </li>
              <li>
                <span className="font-semibold text-gray-700">Account Security:</span>{" "}
                Notify the institution immediately if you suspect unauthorized
                access to your account.
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Use of the System
            </h2>
            <p className="text-gray-600 mb-4">
              The System is provided for purposes related to extracurricular
              activity management and registration. You agree to use it for
              legitimate purposes, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-5 marker:text-indigo-500">
              <li>Browsing available extracurricular activities.</li>
              <li>Registering for activities.</li>
              <li>Viewing schedules, guidelines or event details.</li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Prohibited Activities
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-5 marker:text-indigo-500">
              <li>
                Attempting to gain unauthorized access to any area of the System.
              </li>
              <li>Uploading or distributing harmful software.</li>
              <li>Posting inappropriate or offensive content.</li>
              <li>Misusing the System for unrelated purposes.</li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Intellectual Property
            </h2>
            <p className="text-gray-600 mb-4">
              All content available on the System is the property of its
              licensors. You may not reproduce, distribute or modify any content
              without authorization.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Privacy and Data Use
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-2 pl-5 marker:text-indigo-500">
              <li>
                <span className="font-semibold text-gray-700">Data Collection:</span>{" "}
                Data collected will only be used to facilitate activity
                registration and communication.
              </li>
              <li>
                <span className="font-semibold text-gray-700">Privacy Policy:</span>{" "}
                Use of the System is governed by the ECA Privacy Policy.
              </li>
            </ul>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Changes to the System
            </h2>
            <p className="text-gray-600 mb-4">
              ECA reserves the right to update, modify or discontinue the System
              at any time without notice. Updates to these Terms will be posted
              within the System.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Termination of Access
            </h2>
            <p className="text-gray-600 mb-4">
              The ECA may revoke or suspend your access to the System for
              violations of these Terms or misuse.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 pb-2 border-b border-gray-200">
              Contact Information
            </h2>
            <p className="text-gray-600">For inquiries or concerns, contact:</p>
            <address className="not-italic text-gray-600 mt-4 space-y-2">
              <p>Extracurricular Activities Registration</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:kibetcaleb@zetech.ac.ke"
                  className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                >
                  kibetcaleb@zetech.ac.ke
                </a>
              </p>
              <p>Phone: +254757807975</p>
            </address>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
