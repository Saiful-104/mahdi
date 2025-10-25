import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const SkillDetails = () => {
  const { skillId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Protected route
  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [currentUser, navigate, location]);

  // Fetch skill data
  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await fetch("/skills.json");
        const data = await response.json();
        const foundSkill = data.find(
          (item) => item.skillId === parseInt(skillId)
        );
        setSkill(foundSkill || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching skill data:", error);
        setLoading(false);
      }
    };

    if (currentUser) fetchSkillData();
  }, [skillId, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Session booked successfully!");
    setFormData({ name: "", email: "" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <div className="alert alert-error shadow-lg max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold">Skill not found!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 space-y-10">
      
        <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <img
              src={skill.image}
              alt={skill.skillName}
              className="w-full h-96 lg:h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-4 right-4 badge badge-primary text-lg font-semibold shadow-md">
              ${skill.price}/session
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center space-y-5">
            <div>
              <h2 className="text-4xl font-extrabold text-indigo-700">
                {skill.skillName}
              </h2>
              <span className="badge badge-secondary mt-2 px-4 py-2 text-sm">
                {skill.category}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="rating rating-md">
                {[...Array(5)].map((_, i) => (
                  <input
                    key={i}
                    type="radio"
                    name={`rating-${skill.skillId}`}
                    className="mask mask-star-2 bg-yellow-400"
                    checked={i < Math.floor(skill.rating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="font-semibold text-lg text-gray-700">
                {skill.rating}
              </span>
            </div>

            {/* Provider Info */}
            <div className="bg-gradient-to-r from-indigo-100 to-blue-100 p-4 rounded-xl space-y-3">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Provider:</span>{" "}
                {skill.providerName}
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="font-semibold">Email:</span>{" "}
                <span className="text-sm">{skill.providerEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-semibold">Slots Available:</span>
                <span className="badge badge-success px-3 py-2 text-sm">
                  {skill.slotsAvailable}
                </span>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{skill.description}</p>
          </div>
        </div>

        {/* Booking Section Below */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-6 flex items-center gap-2 text-indigo-700 text-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-indigo-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            Book a Session
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Your Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="input input-bordered input-primary w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Your Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="input input-bordered input-primary w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full mt-3 hover:shadow-lg transition-all duration-300 text-white font-semibold tracking-wide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              Book Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;
