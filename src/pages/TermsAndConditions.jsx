import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen w-full pt-16 sm:px-6 ">
      <div className="p-2">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Terms and Conditions
        </h1>

        <p className="text-gray-700 mb-4">
          Welcome to the{" "}
          <span className="font-semibold">
            Extracurricular Activities Registration System
          </span>{" "}
          . By accessing or using this System, you agree to comply
          with and be bound by the following terms and conditions.
          Please read these Terms carefully before using the System. If you do
          not agree to these Terms, you must refrain from using the System.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Eligibility
        </h2>
        <p className="text-gray-700 mb-4">
          To access and use the System, you must:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Be a registered student.</li>
          <li>
            Have been provided valid login credentials by the institution or its
            authorized personnel.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Account Creation and Security
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <span className="font-semibold">Registration:</span> Accounts are
            created and managed by the institution’s ICT department.
          </li>
          <li>
            <span className="font-semibold">Login Credentials:</span> You are
            responsible for maintaining the confidentiality of your login
            credentials.
          </li>
          <li>
            <span className="font-semibold">Account Security:</span> Notify the
            institution immediately if you suspect unauthorized access to your
            account.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Use of the System
        </h2>
        <p className="text-gray-700 mb-4">
          The System is provided for purposes related to extracurricular
          activity management and registration. You agree to use it for
          legitimate purposes, including but not limited to:
        </p>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Browsing available extracurricular activities.</li>
          <li>Registering for activities.</li>
          <li>Viewing schedules, guidelines or event details.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Prohibited Activities
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            Attempting to gain unauthorized access to any area of the System.
          </li>
          <li>Uploading or distributing harmful software.</li>
          <li>Posting inappropriate or offensive content.</li>
          <li>Misusing the System for unrelated purposes.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4">
          All content available on the System is the property of its licensors. You may not reproduce, distribute
          or modify any content without authorization.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Privacy and Data Use
        </h2>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>
            <span className="font-semibold">Data Collection:</span> Data
            collected will only be used to facilitate activity registration and
            communication.
          </li>
          <li>
            <span className="font-semibold">Privacy Policy:</span> Use of the
            System is governed by the ECA Privacy Policy.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Changes to the System
        </h2>
        <p className="text-gray-700 mb-4">
          ECA reserves the right to update, modify or
          discontinue the System at any time without notice. Updates to these
          Terms will be posted within the System.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Termination of Access
        </h2>
        <p className="text-gray-700 mb-4">
          The ECA may revoke or suspend your access to the System for
          violations of these Terms or misuse.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
          Contact Information
        </h2>
        <p className="text-gray-700">For inquiries or concerns, contact:</p>
        <address className="text-gray-700 mt-2">
          Extracurricular Activities Registration
          <br />
          Email:{" "}
          <a
            href="mailto:kibetcaleb@zetech.ac.ke"
            className="text-blue-600 underline"
          >
            kibetcaleb@zetech.ac.ke
          </a>
          <br />
          Phone: +254757807975
        </address>
      </div>
    </div>
  );
};

export default TermsAndConditions;
