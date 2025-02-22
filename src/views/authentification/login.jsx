import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import Logo from "../../layouts/FullLayout/Logo/LogoIcon";
import { Eye, EyeOff } from "react-feather"; // Icons for show/hide password
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import users from '../../data/users.json';

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Toggle between Sign In and Sign Up
  const [fullName, setFullName] = useState(""); // Full Name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Phone Number field
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [errors, setErrors] = useState({}); // Store validation errors
  const navigate = useNavigate(); // For navigation
  const [error, setError] = useState('');

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};

    // Full Name validation (only for Sign Up)
    if (!isSignIn && !fullName.trim()) {
      newErrors.fullName = "Full Name is required.";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid.";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // Phone Number validation (only for Sign Up)
    if (!isSignIn && !phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone Number is required.";
    } else if (!isSignIn && !/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    if (isSignIn) {
      // Login logic
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('Users stored:', users); // Pour déboguer
        console.log('Trying to login with:', email, password); // Pour déboguer
        
        // Vérification admin
        if (email === "alae@gmail.com" && password === "123456") {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'admin');
          navigate('/app/dashboard');
          return; // Ajout d'un return pour sortir de la fonction après connexion admin
        }

        // Vérification client
        const user = users.find(u => {
          console.log('Comparing with:', u.email, u.password); // Pour déboguer
          return u.email.toLowerCase() === email.toLowerCase() && u.password === password;
        });

        if (user) {
          console.log('User found:', user); // Pour déboguer
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'client');
          localStorage.setItem('currentUser', JSON.stringify(user));
          navigate('/app/event');
        } else {
          console.log('No user found'); // Pour déboguer
          setError('Email ou mot de passe incorrect');
        }
      } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        setError('Une erreur est survenue lors de la connexion');
      }
    } else {
      // Sign up logic
      try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Vérifier si l'email existe déjà
        if (users.some(user => user.email === email)) {
          setError('Cet email est déjà utilisé');
          return;
        }

        // Créer le nouvel utilisateur
        const newUser = {
          id: Date.now(), // Simple ID unique
          fullName,
          email,
          password,
          phoneNumber,
          role: 'client' // Par défaut, tous les nouveaux utilisateurs sont des clients
        };

        // Ajouter le nouvel utilisateur à la liste
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Réinitialiser le formulaire
        setFullName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        
        // Basculer vers le formulaire de connexion
        setIsSignIn(true);
        setError('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        setError("Une erreur s'est produite lors de l'inscription");
      }
    }
  };

  // Modifiez les gestionnaires de changement pour utiliser directement les états
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(''); // Effacer les erreurs précédentes
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(''); // Effacer les erreurs précédentes
  };

  return (
    <div className="min-h-screen flex items-center justify-center futuristic-bg relative overflow-hidden">
      {/* Animated Shapes */}
      <div className="shape shape1 top-0 left-0"></div>
      <div className="shape shape2 top-0 right-0"></div>
      <div className="shape shape3 bottom-0 left-0"></div>

      {/* Form Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md bg-opacity-90 relative z-20">
        {/* Header with Logo */}
        <div className="flex justify-center mb-6">
          <Logo />
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name Field (Only for Sign Up) */}
          {!isSignIn && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.fullName ? "border-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-10 text-gray-500 hover:text-blue-500 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Phone Number Field (Only for Sign Up) */}
          {!isSignIn && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.phoneNumber ? "border-red-500" : "focus:ring-blue-500"
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
              )}
            </div>
          )}

          {/* Afficher le message d'erreur */}
          {error && (
            <div className="mb-4">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {/* Toggle Between Sign In and Sign Up */}
        <p className="text-center mt-6">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInSignUp;