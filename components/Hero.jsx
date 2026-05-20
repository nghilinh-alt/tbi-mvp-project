import React from 'react';

export default function Hero() {
  return (
    <section className="py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto animate-fade-in-up">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Building Digital Experiences
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Accessible, photophobia-friendly web applications crafted with care for your eyes
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary px-8 py-3 rounded-lg font-semibold">
            View Projects
          </button>
          <button className="btn-primary bg-slate-700 hover:bg-slate-600 border border-slate-600 px-8 py-3 rounded-lg font-semibold">
            Browse Jobs
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto text-center">
          <div>
            <p className="text-3xl font-bold text-indigo-400">50+</p>
            <p className="text-sm text-gray-400">Projects</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">98%</p>
            <p className="text-sm text-gray-400">Accessibility</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-pink-400">25+</p>
            <p className="text-sm text-gray-400">Clients</p>
          </div>
        </div>
      </div>
    </section>
  );
}
