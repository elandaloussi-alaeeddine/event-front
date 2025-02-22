import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { Mail } from "react-feather"; // Icons for email verification

const Email = () => {
  const [showForm, setShowForm] = useState(false); // Toggle between message and form
  const [code, setCode] = useState(Array(6).fill("")); // Store verification code (6 digits)
  const [errors, setErrors] = useState(""); // Store validation errors
  const inputRefs = useRef([]); // Refs for input fields
  const navigate = useNavigate(); // For navigation

  // Show the form after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 1000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  // Handle input change
  const handleInputChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input field
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain").trim();

    // Only proceed if the pasted text is exactly 6 digits
    if (/^\d{6}$/.test(pastedText)) {
      const digits = pastedText.split("");
      setCode(digits);

      // Focus on the last input field
      inputRefs.current[5].focus();
    } else {
      setErrors("Please paste exactly 6 digits.");
    }
  };

  // Validate code
  const validateCode = () => {
    if (code.some((digit) => !digit)) {
      setErrors("Please fill in all fields.");
      return false;
    }
    setErrors("");
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateCode()) {
      console.log("Verification code submitted:", code.join(""));
      // Redirect to the login page
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center futuristic-bg relative overflow-hidden">
      {/* Animated Shapes */}
      <div className="shape shape1 top-0 left-0"></div>
      <div className="shape shape2 top-0 right-0"></div>
      <div className="shape shape3 bottom-0 left-0"></div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90 relative z-20">
        {!showForm ? (
          // Email Verification Message
          <div className="text-center">
            <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Verification Email Sent</h2>
            <p className="text-gray-600">
              A verification email has been sent to your inbox. Please check your
              email to proceed.
            </p>
          </div>
        ) : (
          // Verification Code Form
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6">
              Enter Verification Code
            </h2>
            <p className="text-gray-600 text-center mb-6">
              A verification code has been sent to <strong>@peatix.com</strong>.
              Please check your inbox and enter the verification code below.
            </p>
            <div className="flex justify-center space-x-4 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleBackspace(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined} // Only handle paste on the first input
                  maxLength={1}
                  className={`w-12 h-12 text-center border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors ? "border-red-500" : "border-gray-300"
                  }`}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            {errors && (
              <p className="text-red-500 text-sm text-center mb-4">{errors}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Verify
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Email;