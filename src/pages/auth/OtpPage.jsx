import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const OtpPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      // TODO: Replace this with real API call to verify OTP
      if (otp === "123456") {
        setSuccess("✅ OTP Verified! Redirecting...");
        setTimeout(() => navigate("/home"), 1500);
      } else {
        setError("❌ Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 p-2 border border-gray-600 rounded-full hover:scale-105 transition"
      >
        <ArrowLeft className="w-5 h-5 text-white" />
      </button>

      <div className="w-full max-w-sm bg-zinc-900/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-4">Enter OTP</h1>
        <p className="text-sm text-center text-gray-400 mb-6">
          We sent a 6-digit code to your email. Please enter it below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
              setError(null);
              setSuccess(null);
            }}
            placeholder="Enter 6-digit OTP"
            className="text-center tracking-widest text-xl bg-zinc-800 border border-zinc-700 rounded-lg py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-green-400 text-sm text-center">{success}</p>}

          <button
            type="submit"
            className="w-full py-2 font-bold bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => alert("Resent OTP ✅ (demo)")}
            className="text-blue-400 text-sm hover:underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpPage;
