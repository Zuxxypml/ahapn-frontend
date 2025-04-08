// src/Welcome.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ahapnLogo from "./assets/ahapn-logo.png";
import beninMask from "./assets/benin-mask.png";
import emzorLogo from "./assets/emzor-logo.png";
import alphaPharmLogo from "./assets/alpha-pharmacy-logo.png";
import superiorLogo from "./assets/superior-logo.png";
import sunLogo from "./assets/sun-pharm-logo.png";
import fidsonLogo from "./assets/fidson-logo.png";
import bondChemLogo from "./assets/bond-chem-logo.png";
import dgfLogo from "./assets/dgf-logo.png";
import evansThLogo from "./assets/evans-th-logo.png";
import getzLogo from "./assets/getz-logo.png";
import juhelLogo from "./assets/juhel-logo.png";
import neimethLogo from "./assets/neimeth-logo.png";
import nemelLogo from "./assets/nemel-logo.png";
import realsLogo from "./assets/reals-logo.png";
import samLogo from "./assets/sam-logo.png";
import shalinaLogo from "./assets/shalina-logo.png";
import vitaBiotics from "./assets/vitabiotics-logo.png";
import "./index.css";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "UK",
  "USA",
  "Canada",
];

const partnerLogos = [
  emzorLogo,
  alphaPharmLogo,
  superiorLogo,
  sunLogo,
  fidsonLogo,
  bondChemLogo,
  dgfLogo,
  evansThLogo,
  getzLogo,
  juhelLogo,
  neimethLogo,
  nemelLogo,
  realsLogo,
  samLogo,
  shalinaLogo,
  vitaBiotics,
];

const API_URL = import.meta.env.VITE_API_URL || "https://ahapnng.org";

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4 my-4 max-h-[90vh] overflow-y-auto hide-scrollbar">
        <h3 className="text-xl md:text-2xl text-[#006400] font-bold mb-4">
          {title}
        </h3>
        {children}
        <button
          onClick={onClose}
          className="mt-4 w-full p-2 md:p-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          aria-label="Close modal"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function Welcome() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    state: "",
    regId: "",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eventId, setEventId] = useState("");
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showForm, setShowForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retrieveEmail, setRetrieveEmail] = useState("");

  function calculateTimeLeft() {
    const eventDate = new Date("2025-08-04");
    const today = new Date();
    const diff = eventDate - today;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";
    else if (!/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Phone number is invalid.";
    if (!formData.state) newErrors.state = "State/Country is required.";
    if (!formData.regId.trim())
      newErrors.regId = "Registration ID is required.";
    if (image && image.size > 5 * 1024 * 1024)
      newErrors.image = "Image must be less than 5 MB."; // 5 MB limit
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 5 MB.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, image: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setErrorMessage("Please fix the errors above before submitting.");
      return;
    }
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);

    try {
      const response = await axios.post(`${API_URL}/api/waitlist`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setEventId(response.data.eventId);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        state: "",
        regId: "",
      });
      setImage(null);
      setImagePreview(null);
      setErrors({});
      setShowForm(null);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong!");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const retrieveId = async () => {
    if (!retrieveEmail) {
      setErrorMessage("Please enter your email to retrieve your ID.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/waitlist/${retrieveEmail}`
      );
      setEventId(response.data.eventId);
      setSuccessMessage("ID retrieved successfully!");
      setErrorMessage("");
      setShowForm(null);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Error retrieving ID. Please check your email."
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  const downloadId = async () => {
    if (!eventId) {
      setErrorMessage("No event ID available. Please retrieve your ID first.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `${API_URL}/api/event-id-pdf/${eventId}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = `event_id_${
        formData.email || retrieveEmail || "user"
      }.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setSuccessMessage("PDF downloaded successfully!");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        "Error downloading ID PDF: " +
          (error.response?.data?.message || error.message)
      );
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200">
      <div className="container mx-auto p-4 md:p-6 text-center">
        <header className="flex flex-col md:flex-row items-center justify-center mb-6 md:mb-8">
          <img
            src={ahapnLogo}
            alt="AHAPN Logo"
            className="w-16 md:w-24 h-auto mb-4 md:mb-0 md:mr-4"
          />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            Association of Hospital and Administrative Pharmacists of Nigeria
            (AHAPN) Presents
          </h2>
          <img
            src={beninMask}
            alt="Benin Mask"
            className="w-24 md:w-36 h-auto mt-4 md:mt-0 md:ml-4"
          />
        </header>

        <main>
          <h1 className="text-3xl md:text-5xl font-bold text-[#006400] mb-3 md:mb-4">
            Edo 2025
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-[#006400] mb-3 md:mb-4">
            26th Annual National Scientific Conference
          </h2>
          <div className="flex justify-center mb-4 md:mb-6">
            <div className="w-16 md:w-24 h-16 md:h-24 bg-[#006400] rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold relative">
              26th
              <span className="absolute text-base md:text-lg">+</span>
            </div>
          </div>
          <div className="mb-4 md:mb-6">
            <div className="inline-block bg-white border-2 border-[#006400] px-4 py-2 md:px-6 md:py-3 rounded-lg text-xl md:text-3xl text-[#006400] font-bold relative">
              {timeLeft.days} Days, {timeLeft.hours} Hrs, {timeLeft.minutes}{" "}
              Mins, {timeLeft.seconds} Secs
              <span className="absolute left-0 top-1/2 w-1 md:w-2 h-6 md:h-8 bg-[#006400] transform -translate-y-1/2"></span>
              <span className="absolute right-0 top-1/2 w-1 md:w-2 h-6 md:h-8 bg-[#006400] transform -translate-y-1/2"></span>
            </div>
          </div>
          <h3 className="text-xl md:text-2xl text-[#006400] mb-3 md:mb-4">
            Theme: Innovations in Pharmaceutical Care Delivery for Equitable
            Patients’ Healthcare
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold text-[#006400] mb-6 md:mb-8">
            4th – 9th August 2025
          </h2>

          <div className="mb-8 md:mb-12">
            <h4 className="text-lg md:text-xl text-[#006400] mb-3 md:mb-4">
              Partners:
            </h4>
            <div className="flex justify-center flex-wrap gap-4 md:gap-8">
              {partnerLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  className="w-16 h-8 md:w-20 md:h-10 object-contain"
                />
              ))}
            </div>
          </div>

          <div className="mb-8 flex flex-col md:flex-row justify-center gap-4">
            <button
              onClick={() => setShowForm("waitlist")}
              className="p-2 md:p-3 bg-[#006400] text-white font-bold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#006400] w-full md:w-auto"
              aria-label="Join the Waitlist"
            >
              Join the Waitlist
            </button>
            <button
              onClick={() => setShowForm("retrieve")}
              className="p-2 md:p-3 bg-[#006400] text-white font-bold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#006400] w-full md:w-auto"
              aria-label="Download ID for Returning Users"
            >
              Download ID (Returning Users)
            </button>
          </div>

          {loading && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <p className="text-white text-lg">Loading...</p>
            </div>
          )}

          {showForm === "waitlist" && (
            <Modal title="Join the Waitlist" onClose={() => setShowForm(null)}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <input
                    name="phoneNumber"
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  >
                    <option value="">Select State/Country</option>
                    {states.map((stateOption) => (
                      <option key={stateOption} value={stateOption}>
                        {stateOption}
                      </option>
                    ))}
                  </select>
                  {errors.state && (
                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                  )}
                </div>
                <div>
                  <input
                    name="regId"
                    type="text"
                    placeholder="Registration ID (e.g., REG123456)"
                    value={formData.regId}
                    onChange={handleChange}
                    required
                    className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                  />
                  <p className="text-gray-600 text-xs mt-1">
                    Contact admin at{" "}
                    <a
                      href="mailto:ahapn2021@gmail.com"
                      className="text-[#006400] underline"
                    >
                      ahapn2021@gmail.com
                    </a>{" "}
                    to purchase a registration ID.
                  </p>
                  {errors.regId && (
                    <p className="text-red-500 text-xs mt-1">{errors.regId}</p>
                  )}
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg"
                  />
                  <p className="text-gray-600 text-xs mt-1">
                    Optional: Upload an image (max 5 MB).
                  </p>
                  {errors.image && (
                    <p className="text-red-500 text-xs mt-1">{errors.image}</p>
                  )}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 mt-2 rounded"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full p-2 md:p-3 bg-[#006400] text-white font-bold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#006400] disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
              {successMessage && (
                <p className="mt-4 text-[#006400]">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="mt-4 text-red-500">{errorMessage}</p>
              )}
            </Modal>
          )}

          {showForm === "retrieve" && (
            <Modal title="Download Your ID" onClose={() => setShowForm(null)}>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email to retrieve your ID"
                  value={retrieveEmail}
                  onChange={(e) => setRetrieveEmail(e.target.value)}
                  className="w-full p-2 md:p-3 border-2 border-[#006400] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006400]"
                />
                <button
                  onClick={retrieveId}
                  disabled={loading}
                  className="w-full p-2 md:p-3 bg-[#006400] text-white font-bold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#006400] disabled:opacity-50"
                >
                  {loading ? "Retrieving..." : "Retrieve ID"}
                </button>
              </div>
              {eventId && (
                <div className="mt-4">
                  <p className="text-lg md:text-xl text-[#006400] mb-3">
                    Your Event ID: {eventId}
                  </p>
                  <button
                    onClick={downloadId}
                    disabled={loading}
                    className="p-2 md:p-3 bg-[#006400] text-white font-bold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#006400] disabled:opacity-50"
                  >
                    {loading ? "Downloading..." : "Download ID (PDF)"}
                  </button>
                </div>
              )}
              {successMessage && (
                <p className="mt-4 text-[#006400]">{successMessage}</p>
              )}
              {errorMessage && (
                <p className="mt-4 text-red-500">{errorMessage}</p>
              )}
            </Modal>
          )}

          {eventId && showForm === null && (
            <div className="mt-6 md:mt-8">
              <p className="text-lg md:text-xl text-[#006400] mb-3">
                Your Event ID: {eventId}
              </p>
              <button
                onClick={downloadId}
                disabled={loading}
                className="p-2 md:p-3 bg-[#006400] text-white font-bold rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#006400] disabled:opacity-50"
              >
                {loading ? "Downloading..." : "Download ID (PDF)"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
