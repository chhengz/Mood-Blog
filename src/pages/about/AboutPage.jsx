import React, { useState } from "react";
import { Link } from "react-router";
import { ABOUT_ME } from "../../data/about";

const AVATAR_URL =
  "https://static.vecteezy.com/system/resources/previews/027/951/137/non_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png";

const AboutPage = () => {

  const [activeTab, setActiveTab] = useState("overview");



  return (
    <main className="mt-6 md:mt-8">
      <div className="">
        {/* Header Section */}

        {/* <div className="flex mb-4 justify-between items-center bg-white rounded-xl shadow-md">
          d
        </div> */}

        <div className="px-2 sm:px-4 py-2 sm:py-4 flex items-center bg-gray-800  rounded-2xl shadow-md">
          <div className="border w-24 h-24 rounded-xl overflow-hidden">
            <img
              src={AVATAR_URL}
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="flex-1 ml-4">
            <h1 className="text-2xl md:text-3xl md:mb-1 font-bold">
              {ABOUT_ME.name}
            </h1>
            <p className="text-sm text-gray-600">{ABOUT_ME.bio}</p>
          </div>
        </div>


          {/* Tab switch for different sections */}
          <div className="mt-4 flex justify-center ">
            <div className="p-1 gap-2 flex border border-gray-400 rounded-xl">
              <button 
              onClick={() => setActiveTab('overview')}
              className={`cursor-pointer px-3 py-0 text-md  text-gray-200 hover:text-white rounded-lg  ${activeTab === 'overview' ? 'bg-blue-400' : ''}`}>
              Overview
              </button>

              <button 
              onClick={() => setActiveTab('details')}
              className={`cursor-pointer px-3 py-0 text-md  text-gray-200 hover:text-white rounded-lg ${activeTab === 'details' ? 'bg-blue-400' : ''}`}>
              Details
              </button>
            </div>
          </div>

          {/* Tab Content */}

          <div className="mt-6 p-4 border border-gray-600 rounded-xl shadow-md">
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-md md:text-xl font-semibold mb-2 text-gray-200">Overview</h2>
                <p className="text-gray-400 text-sm md:text-md">
                  Hello! I'm {ABOUT_ME.name}, a passionate web developer dedicated to crafting beautiful and functional web applications. With a strong foundation in both front-end and back-end technologies, I strive to create seamless user experiences that are both engaging and efficient.
                </p>
              </div>
            )}


            {activeTab === 'details' && (
              <div>

              <div className="">
                <h2 className="text-md md:text-xl font-semibold mb-2 text-gray-200">Details</h2>
                <ul className="list-disc list-inside ml-2 text-sm md:text-md text-gray-300">
                  <li><strong>Location:</strong> {ABOUT_ME.location}</li>
                  
                  <li><strong>Skills:</strong> {ABOUT_ME.skills.join(", ")}</li>

                <li><strong>GitHub:</strong> <Link to={ABOUT_ME.socialLinks.github} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{ABOUT_ME.socialLinks.github}</Link></li>
                <li><strong>LinkedIn:</strong> <Link to={ABOUT_ME.socialLinks.linkedin} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{ABOUT_ME.socialLinks.linkedin}</Link></li>
                <li><strong>X:</strong> <Link to={ABOUT_ME.socialLinks.x} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">{ABOUT_ME.socialLinks.x}</Link></li>
                </ul>
              </div>

              <div className="mt-6 p-4 border border-gray-600 rounded-md shadow-md">
                <h2 className="text-md md:text-xl font-semibold mb-2 text-gray-200">Experiences</h2>

                <ul className="list-disc list-inside ml-2 text-sm md:text-md text-gray-300">
                  {
                    ABOUT_ME.experience.map((exp, index) => (
                      <li key={index}
                      className=" mb-4 md:mb-6"
                      >
                        <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                        <ul className="list-disc list-inside ml-4">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i}>{resp}</li>
                          ))}
                        </ul>
                      </li>
                    ))
                  }
                </ul>
              </div>

              </div>
            )}

            
          </div>

            

      </div>
    </main>
  );
};

export default AboutPage;
