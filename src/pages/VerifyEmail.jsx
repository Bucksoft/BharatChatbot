import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { state } = useLocation();
  const [email, setEmail] = useState(state?.email || "");
  const [resendAvailable, setResendAvailable] = useState(!!state?.email);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      setResendAvailable(false);
    }
  }, [email]);

  const handleResend = async () => {
    if (!email) return;

    try {
      setResending(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/resend-verification`,
        { email }
      );
      toast.success(res.data.message || "Verification email sent again.");
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to resend email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="bg-black text-white max-w-md mx-auto p-6 mt-10 shadow-xl rounded-xl border text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Verify Your Email
      </h2>

      {email ? (
        <>
          <p className="mb-2 text-gray-700">
            A verification link has been sent to:
          </p>
          <p className="font-semibold text-blue-600 mb-4">{email}</p>

          <button
            onClick={handleResend}
            disabled={resending}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend Verification Email"}
          </button>
        </>
      ) : (
        <p className="text-red-500">
          Email not provided. Please go back to login.
        </p>
      )}
    </div>
  );
};

export default VerifyEmail;
