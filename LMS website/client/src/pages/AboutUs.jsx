import React from "react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <section className="relative bg-black text-white py-24">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-black to-blue-900 opacity-80"></div>

      <div className="relative container mx-auto px-6 md:px-12 lg:px-20">
        {/* Title */}
        <h2 className="text-center text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 py-3">
          Elevate Your Learning <span className="text-white">🚀</span>
        </h2>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 items-center gap-12 mt-12">
          {/* Left Content */}
          <div>
            <p className="text-lg leading-relaxed opacity-90 mb-6">
              Welcome to{" "}
              <span className="text-blue-400 font-semibold">E-Learning</span>,
              where education meets innovation. We deliver{" "}
              <strong>expert-led courses</strong> designed for all skill levels.
            </p>

            {/* Key Features */}
            <div className="space-y-6">
              {[
                ["🚀", "Taught by Industry Experts"],
                ["📚", "Interactive & Engaging Lessons"],
                ["💡", "Job-Oriented Skill Development"],
                ["🌎", "Global Community Access"],
              ].map(([icon, text], index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-white bg-opacity-10 p-4 rounded-lg shadow-md backdrop-blur-lg"
                >
                  <span className="bg-purple-500 text-black p-3 rounded-full text-2xl">
                    {icon}
                  </span>
                  <p className="text-lg text-white">{text}</p>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-purple-500 text-black px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-400">
              Start Learning 🚀
            </button>
          </div>

          {/* Right Image */}
          <div>
            <img
              src="https://img.freepik.com/premium-vector/elearning-online-education-technology-concept-webinar-teaching-training-courses-skill-development_127544-3122.jpg"
              alt="E-Learning"
              className="rounded-lg shadow-2xl border-4 border-purple-500 hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>

      {/* Job Placement Section */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 mt-16">
        <h3 className="text-4xl font-extrabold text-center text-purple-400 mb-8">
          Job Placement & Assistance 🎯
        </h3>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left - Partnerships */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg text-gray-200 p-8 rounded-lg shadow-lg border border-gray-600">
            <h4 className="text-2xl font-bold text-purple-400">
              🤝 Hiring Partnerships
            </h4>
            <p className="mt-4 text-lg">
              We collaborate with leading tech companies to help students land
              their dream jobs. Our network includes startups and Fortune 500
              firms eager to hire skilled professionals.
            </p>
          </div>

          {/* Right - Placement Services */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg text-gray-200 p-8 rounded-lg shadow-lg border border-gray-600">
            <h4 className="text-2xl font-bold text-purple-400">
              🚀 Placement Services
            </h4>
            <p className="mt-4 text-lg">
              We offer resume building, mock interviews, career counseling, and
              job referrals to give you the best chance at securing a great
              position in the industry.
            </p>
          </div>
        </div>
      </div>

      {/* Hiring Companies Section */}
      <div className="relative container mx-auto px-6 md:px-12 lg:px-20 mt-16">
        <h3 className="text-4xl font-extrabold text-center text-purple-400 mb-8">
          Companies That Hire Our Students 🏆
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            [
              "Google",
              "Innovating the world with AI and cloud computing. Our graduates have secured roles in software engineering and data science.",
            ],
            [
              "Microsoft",
              "Empowering every person and organization on the planet to achieve more. Many of our students work on cutting-edge projects here.",
            ],
            [
              "Amazon",
              "A global leader in e-commerce and cloud services. Graduates join AWS, web development, and data analytics teams.",
            ],
            [
              "Tesla",
              "Driving the future of electric vehicles and AI. Our learners have contributed to software and automation teams.",
            ],
            [
              "Meta",
              "Connecting the world through social technologies. Students work on full-stack development and VR innovations.",
            ],
            [
              "IBM",
              "Pioneering AI and blockchain solutions. Our alumni work as AI engineers and cloud architects.",
            ],
          ].map(([company, description], index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg text-gray-200 p-6 rounded-lg shadow-lg border border-gray-600"
            >
              <h4 className="text-2xl font-semibold text-purple-400">
                {company}
              </h4>
              <p className="mt-4 text-lg">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 relative">
        <h3 className="text-4xl font-extrabold text-purple-600 mb-6">
          Join 100,000+ Learners 🚀
        </h3>
        <p className="text-lg mb-6">Step into the future of learning today!</p>
        <button
          onClick={() => navigate("/courses")}
          className="bg-purple-500 text-black px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:bg-purple-400"
        >
          Enroll Now 🔥
        </button>
      </div>
    </section>
  );
};

export default AboutUs;
