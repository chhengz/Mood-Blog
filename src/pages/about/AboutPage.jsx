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
        <div className="px-2 sm:px-4 py-2 sm:py-4 flex items-center bg-zinc-400 rounded-2xl shadow-md">
          <div className=" w-24 h-24 rounded-xl overflow-hidden">
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
            <p className="text-sm ">{ABOUT_ME.bio}</p>
          </div>
        </div>

        {/* Tab switch for different sections */}
        <div className="mt-4 flex justify-center ">
          <div className="p-1 gap-2 flex border border-gray-400 rounded-xl">
            <button
              onClick={() => setActiveTab("overview")}
              className={`cursor-pointer px-3 py-0 text-lg rounded-lg  ${
                activeTab === "overview" ? "bg-blue-400" : ""
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => setActiveTab("details")}
              className={`cursor-pointer px-3 py-0 text-lg rounded-lg ${
                activeTab === "details" ? "bg-blue-400" : ""
              }`}
            >
              Details
            </button>
          </div>
        </div>

        {/* Tab Content */}

        <div className="mt-6 p-4 border border-gray-600 rounded-xl shadow-md">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Overview
              </h2>
              <p className=" text-md md:text-lg">
                Hello! I'm {ABOUT_ME.name}, a passionate web developer dedicated
                to crafting beautiful and functional web applications. With a
                strong foundation in both front-end and back-end technologies, I
                strive to create seamless user experiences that are both
                engaging and efficient.
              </p>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <div className="">
                <h2 className="text-lg md:text-2xl font-semibold mb-2 ">
                  Details
                </h2>
                <ul className="list-disc list-inside ml-2 flex-wrap text-md md:text-lg ">
                  <li>
                    <strong>Location:</strong> {ABOUT_ME.location}
                  </li>

                  <li>
                    <strong>Skills:</strong> {ABOUT_ME.skills.join(", ")}
                  </li>

                  <li className="">
                    <strong>Social Links:</strong>
                    <ul className="ml-4 mt-2 flex space-x-2">
                      <li className="group">
                        <Link
                          to={ABOUT_ME.socialLinks.github}
                          className="  text-blue-400 group-hover:text-blue-500 border border-blue-200 group-hover:border-blue-400 group-hover:underline px-3 py-1 rounded-xl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          GitHub
                        </Link>
                      </li>
                      <li className="group">
                        <Link
                          to={ABOUT_ME.socialLinks.linkedin}
                          className="  text-blue-400 group-hover:text-blue-500 border border-blue-200 group-hover:border-blue-400 group-hover:underline px-3 py-1 rounded-xl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LinkedIn
                        </Link>
                      </li>
                      <li className="group">
                        <Link
                          to={ABOUT_ME.socialLinks.x}
                          className="  text-blue-400 group-hover:text-blue-500 border border-blue-200 group-hover:border-blue-400 group-hover:underline px-3 py-1 rounded-xl"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          X
                        </Link>
                      </li>
                    </ul>
                  </li>

                </ul>
              </div>

              <div className="mt-6 p-4 border border-gray-600 rounded-md shadow-md">
                <h2 className="text-lg md:text-2xl font-semibold mb-2 ">
                  Experiences
                </h2>

                <ul className="list-disc list-inside ml-2 text-md md:text-lg ">
                  {ABOUT_ME.experience.map((exp, index) => (
                    <li key={index} className=" mb-4 md:mb-6">
                      <strong>{exp.role}</strong> at {exp.company} (
                      {exp.duration})
                      <ul className="list-disc list-inside ml-4 opacity-80">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
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
