import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import useApi from "../../hooks/useApi";
import { Link, useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import { House, X } from "lucide-react";
import OtpForm from "./OtpForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const { post, loading, error } = useApi();
  const { login, isAuthenticated } = useContext(AppContext);
  
  const [otp, setOtp] = useState(Array(6).fill(''));
  
  const [formError, setFormError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const { email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // Validate required fields
    if (!email || !password) {
      setFormError("Please fill in both fields.");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    try {
      const result = await post("/auth/login", { email, password });

      if (result?.status === "success" && result?.data?.accessToken) {
        login(result.data.user, result.data.accessToken);
        navigate("/home");
      } else {
        setFormError(result?.message || "Invalid email or password.");
      }

    } catch (err) {
      setFormError(err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear formError when user starts typing to improve UX
    setFormError(null);
  };


   const handleSendCode = async (email) => {

    console.log('Sending code to:', email);
  };

  const handleVerify = async (email, code) => {
   
    console.log('Verifying', email, code);
  };

  return (
    <div className="overflow-hidden relative min-h-screen ">
      <button
        onClick={() => navigate("/home")}
        className="z-30 absolute  p-2 top-4 md:top-8 left-4 md:left-8 border border-gray-600 rounded-full hover:shadow-lg hover:scale-105 transition cursor-pointer"
      >
        {/* <X className="w-6 h-6 text-white" /> */}
        <House className="w-6 h-6 text-white" />
      </button>

      <div className="min-h-screen  p-4 md:p-6 flex flex-col items-center justify-center   rounded-xl backdrop-blur-2xl">
        <div className="flex flex-col items-center sm:w-75 ">
          
          {isAuthenticated ? <p className="text-green-500 mt-4">You are already logged in.</p> : (
            <>
          
          <div className="mb-6 flex place-items-center bg-zinc-800 rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-white rounded-2xl grid place-items-center">
              <p className="font-bold text-4xl text-center text-zinc-800 mt-1">
                S
              </p>
            </div>
          </div>
          {/* bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent */}
          <h1 className="text-2xl font-medium mb-2 text-center">Yooo, welcome back!</h1>

    {
      isLoginWithOtp ? (
        <OtpForm
          onSendCode={handleSendCode}
          onVerify={handleVerify}
          isLoading={loading}
          error={ formError || error}
    />
      ) : (
        <LoginForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isLoading={loading}
              error={formError || error}
            />
      )
    }
           
            
      

          <div className="w-full flex items-center mb-4">
            <div className="w-full h-0.5 bg-zinc-400/30 rounded-md"></div>
            <p className="mx-2 text-sm">or</p>
            <div className="w-full h-0.5 bg-zinc-400/30 rounded-md"></div>
          </div>

          <div className="w-full">
            <button
              type="submit"
              onClick={() => setIsLoginWithOtp(!isLoginWithOtp)}
              className="w-full px-4 py-2 text-md font-bold text-[var(--text-color)] bg-zinc-900/50 border border-[var(--border-color)]/80 rounded-xl hover:bg-zinc-900/90 shadow-lg cursor-pointer hover:scale-102 transition"
            >
              {isLoginWithOtp ? "login with email" : "Single sign-on (SSO)"} 
            </button>
          </div>


          <div className="mt-6 text-md text-center">
            <p className="text-gray-500">
              By signing in, you agree to our{" "}
              <Link
                to="#TermsOfService"
                className="text-blue-500 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="#PrivacyPolicy"
                className="text-blue-500 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          </>
          )}

        </div>
      </div>

      <div className="-z-10 absolute -top-10 -right-10 bg-[#545456]/50 w-58 h-58 blur-3xl rounded-full"></div>
      <div className="-z-10 absolute -bottom-10 -left-10 bg-[#545456]/50 w-58 h-58 blur-3xl rounded-full"></div>
    </div>
  );
};

export default LoginPage;
