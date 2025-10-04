import React, { useState, useRef } from "react";

const OtpForm = ({ onSendCode, onVerify, isLoading, error }) => {
  const [step, setStep] = useState("email"); // 'email' or 'otp'
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email) return;
    await onSendCode(email);
    setStep("otp");
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    // check fill all otp inputs
    const isOtpComplete = otp.every((digit) => digit !== "");

    if (isOtpComplete) {
      await onVerify(email, code);
    } 
  };

  return (
    <form
      className="w-full space-y-2 my-6"
      onSubmit={step === "email" ? handleSendCode : handleVerify}
    >
      {/* <h2 className="text-xl font-bold text-center">
          {step === 'email' ? 'Enter your Email' : 'Verify Code'}
        </h2> */}

      {error && <p className="text-red-500 text-md text-center">{error}</p>}

      {step === "email" ? (
        <>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-3 py-2 text-md text-gray-400 bg-zinc-900/50 border border-[var(--border-color)] rounded-xl focus:outline-none focus:ring-1 focus:ring-gray-600/50 shadow-lg'
            required
          />

          <button
            type="submit"
            className="w-full mt-2 px-4 py-2 text-md font-bold text-[var(--text-black)] bg-white rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600/50 shadow-lg cursor-pointer hover:scale-102 transition"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Code"}
          </button>
        </>
      ) : (
        <>
          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
              required
                key={index}
                type="text"
                maxLength="1"
                value={otp[index] || ""}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 outline-none"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-4 py-2 text-md font-bold text-[var(--text-black)] bg-white rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600/50 shadow-lg cursor-pointer hover:scale-102 transition"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Code"}
          </button>

          <button
            type="button"
            className="w-full text-md text-gray-500 mt-2 hover:underline cursor-pointer"
            onClick={() => setStep("email")}
          >
            Change Email
          </button>
        </>
      )}
    </form>
  );
};

export default OtpForm;
