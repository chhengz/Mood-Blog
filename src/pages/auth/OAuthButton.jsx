import React from "react";
import GOOGLE_LOGO from "../../assets/google-icon.svg";
import FACEBOOK_LOGO from "../../assets/facebook-icon.svg";


export const OAuthButton = () => {
  const handleOAuth = {
    google: () => {
      console.log("Google button clicked");
    },

    facebook: () => {
      console.log("Facebook button clicked");
    },
  };

  return (
    <div className="w-full space-y-2">
      <button
        onClick={handleOAuth.google}
        className="flex items-center justify-start w-full px-4 py-2 text-md font-bold text-(--text-white) bg-white rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600/50 shadow-lg cursor-pointer hover:scale-102 transition"
      >
        <img src={GOOGLE_LOGO} alt="" className="inline w-6 h-6 mr-2" />
        Continue with Google
      </button>


      <button
        onClick={handleOAuth.facebook}
        className="flex items-center justify-start w-full px-4 py-2 text-md font-bold text-(--text-white) bg-blue-600 rounded-xl hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-gray-600/50 shadow-lg cursor-pointer hover:scale-102 transition"
      >
        <img src={FACEBOOK_LOGO} alt="" className="inline w-6 h-6 mr-2" />
        Continue with Facebook
      </button>
    </div>
  );
};
