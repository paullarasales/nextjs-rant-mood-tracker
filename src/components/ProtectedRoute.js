'use client';
import { useState } from "react";
import { FaLock, FaSmile, FaExclamationTriangle } from "react-icons/fa";

export default function ProtectedRoute({ children }) {
  const [enteredPin, setEnteredPin] = useState("");
  const [isPinCorrect, setIsPinCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const correctPin = process.env.NEXT_PUBLIC_PIN || "1234";

  const handlePinSubmit = (e) => {
    e.preventDefault();

    if (enteredPin === correctPin) {
      setIsPinCorrect(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Incorrect PIN. Please try again.");
      setEnteredPin("");
    }
  };

  return (
    <div>
      {!isPinCorrect ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
            <div className="flex justify-center text-blue-500 mb-4">
              <FaLock size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
              Enter PIN to Access
            </h2>
            {errorMessage && (
              <div className="flex items-center justify-center text-red-500 mb-4">
                <FaExclamationTriangle className="mr-2" />
                <p>{errorMessage}</p>
              </div>
            )}
            <form onSubmit={handlePinSubmit} className="space-y-6">
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
                placeholder="Enter PIN"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Submit
              </button>
            </form>
            <div className="flex justify-center mt-6 text-gray-400">
              <FaSmile size={20} className="mr-2" />
              <p>Don't worry, we keep your secrets safe!</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="transition-opacity duration-700 ease-in-out opacity-100">
          {children}
        </div>
      )}
    </div>
  );
}
