import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(state?.email || "");
  const [resendAvailable, setResendAvailable] = useState(!!state?.email);
  const [resending, setResending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState("");

  const token = searchParams.get("token");
  const urlEmail = searchParams.get("email");

  // Handle email verification if token is present in URL
  useEffect(() => {
    if (token && urlEmail) {
      verifyEmailToken(token, urlEmail);
    }
  }, [token, urlEmail]);

  // Update state email if available in state
  useEffect(() => {
    if (!email) {
      setResendAvailable(false);
    }
  }, [email]);

  const verifyEmailToken = async (token, emailParam) => {
    try {
      setVerifying(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}user/verify-email`,
        {
          token,
          email: emailParam,
        }
      );
      setVerificationMessage(
        res.data.msg || "Email verified successfully! Login again"
      );

      toast.success(res.data.msg || "Email verified successfully! Login again");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Email verification error:", err);
      toast.error(
        err.response?.data?.error || "Invalid or expired verification link."
      );
      setVerificationMessage("Invalid or expired verification link.");
    } finally {
      setVerifying(false);
    }
  };

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
      console.log("ERROR IN VERIFYING EMAIL : ");
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

      {verifying ? (
        <p className="text-blue-400">Verifying your email...</p>
      ) : verificationMessage ? (
        <p className="text-green-500 font-semibold">{verificationMessage}</p>
      ) : email ? (
        <>
          <p className="mb-2 text-gray-400">
            A verification link has been sent to:
          </p>
          <p className="font-semibold text-blue-500 mb-4">{email}</p>

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
