import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import useApi from "../../hooks/useApi";
import { useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import { House, X } from "lucide-react";

const LoginPage = () => {
  const navigate = useNavigate();
  const { post, loading, error } = useApi();
  const { login, isAuthenticated } = useContext(AppContext);
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
      const result = await post("/auth/login", { data: { email, password } });

      if (result?.status === "success" && result?.data?.accessToken) {
        login(result.data.user, result.data.accessToken);

        // optionally save refreshToken somewhere
        // localStorage.setItem("refreshToken", result.data.refreshToken);

        navigate('/home');
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

  return (
    <div className="overflow-hidden relative min-h-screen ">

<button
              onClick={() => navigate('/home')}
              className="z-30 absolute top-8 left-8 border border-gray-600 rounded-full p-2 hover:shadow-lg hover:scale-105 transition cursor-pointer"
            >
              {/* <X className="w-6 h-6 text-white" /> */}
              <House className="w-6 h-6 text-white" />
            </button>


    <div className="min-h-screen  p-4 md:p-6 flex flex-col items-center justify-center   rounded-xl backdrop-blur-2xl">
      <div className="flex flex-col items-center w-75 ">

        <div className="mb-6 flex place-items-center bg-zinc-800 rounded-2xl shadow-lg">
          <div className="w-12 h-12 bg-white rounded-2xl grid place-items-center">
            <p className="font-bold text-4xl text-center text-zinc-800 mt-1">S</p>
          </div>
        </div>
        {/* bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent */}
        <h1 className="text-2xl font-medium mb-2">Yooo, welcome back!</h1>
      
      {isAuthenticated ? (
        <p className="text-green-500 mt-4">You are already logged in.</p>
      ) : (
        <LoginForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          isLoading={loading}
          error={formError || error}
          />
      )}

      <div className="w-full flex items-center my-4">
        <div className="w-full h-0.5 bg-zinc-400/30 rounded-md"></div>
        <p className="mx-2 text-sm">or</p>
        <div className="w-full h-0.5 bg-zinc-400/30 rounded-md"></div>
      </div>

      <div className="w-full">
        <button
            type="submit"
            className='w-full px-4 py-2 text-sm font-bold text-[var(--text-color)] bg-zinc-900/50 border border-[var(--border-color)]/80 rounded-xl hover:bg-zinc-900/90 shadow-lg cursor-pointer hover:scale-102 transition'
            
        >Signle sign-on (SSO)</button>
      </div>

      <div className="mt-6 text-sm text-center">
        <p className="text-gray-500">By signing in, you agree to our <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>.</p>
      </div>

      </div>
    </div>

    <div className="-z-10 absolute -top-10 -right-10 bg-[#545456]/50 w-58 h-58 blur-3xl rounded-full"></div>
    <div className="-z-10 absolute -bottom-10 -left-10 bg-[#545456]/50 w-58 h-58 blur-3xl rounded-full"></div>
          </div>
  );
};

export default LoginPage;
