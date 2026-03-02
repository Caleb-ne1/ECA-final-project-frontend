import React from 'react';
import { FaSearch, FaCalendarAlt, FaUsers, FaChartLine } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-center bg-cover h-screen max-h-[800px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"
          style={{
            backgroundImage: "url('https://img.freepik.com/free-photo/blue-smooth-wall-textured-background_53876-106133.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        ></div>
        
        <div className="relative z-10 px-4 text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Your Passion Beyond the Classroom
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Join a vibrant community of learners through our diverse extracurricular programs
          </p>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Join Our Activities?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of programs designed to help you grow, connect, and excel
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <FaSearch className="text-3xl mb-4" />, title: "Explore Interests", desc: "Discover new passions and hidden talents" },
            { icon: <FaCalendarAlt className="text-3xl mb-4" />, title: "Flexible Scheduling", desc: "Activities that fit your busy schedule" },
            { icon: <FaUsers className="text-3xl mb-4" />, title: "Build Community", desc: "Connect with like-minded peers" },
            { icon: <FaChartLine className="text-3xl mb-4" />, title: "Skill Development", desc: "Gain valuable experience for your future" }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-8 shadow-md hover:shadow-lg transition duration-300 text-center">
              <div className="text-blue-600 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;