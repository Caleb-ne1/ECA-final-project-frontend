import React from 'react'

const Home = () => {
  return (
    <div className='home-container'>
      <section
        className="relative bg-center bg-cover h-96"
        style={{
          backgroundImage:
            "url('https://www.zetech.ac.ke/images/sliders-inner/slide1.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative py-20 text-center text-white">
          <h2 className="text-4xl font-semibold">
            Welcome to the Extracurricular Activity Registration System
          </h2>
          <p className="mt-2 text-lg">
            Explore and register for various activities to enhance your school
            experience.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home