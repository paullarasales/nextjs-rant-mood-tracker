'use client';
import { useState } from "react";

export default function ProtectedRoute({ children }) {
  const [enteredPin, setEnteredPin] = useState("");
  const [isPinCorrect, setIsPinCorrect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const correctPin = process.env.NEXT_PUBLIC_PIN || "1234";

  const handlePinSubmit = (e) => {
    e.preventDefault();

    if (enteredPin === correctPin) {
      setIsPinCorrect(true);
    } else {
      setErrorMessage("Incorrect PIN. Please try again.");
    }
  };

  return (
    <div>
      {!isPinCorrect ? (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h2 className="text-xl font-semibold mb-4 text-center">Enter PIN to Access</h2>
            {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
            <form onSubmit={handlePinSubmit}>
              <input
                type="password"
                value={enteredPin}
                onChange={(e) => setEnteredPin(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter PIN"
              />
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        children 
      )}
    </div>
  );
}