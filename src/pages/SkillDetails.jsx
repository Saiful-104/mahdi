import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const SkillDetails = () => {
  const { skillId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Protected route: redirect if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [currentUser, navigate, location]);

  // Fetch skill data
  useEffect(() => {
    const fetchSkillData = async () => {
      try {
        const response = await fetch('/skills.json');
        const data = await response.json();
        const foundSkill = data.find(item => item.skillId === parseInt(skillId));
        setSkill(foundSkill || null);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skill data:', error);
        setLoading(false);
      }
    };

    if (currentUser) fetchSkillData();
  }, [skillId, currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Session booked successfully!');
    setFormData({ name: '', email: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!skill) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Skill not found!</span>
        </div>
      </div>
    );
  }

  return (
 <div className="card lg:card-side bg-base-100 shadow-xl p-4 lg:p-6">
  <figure className="lg:w-1/2">
    <img
      src={skill.image}
      alt={skill.skillName}
      className="w-full h-full rounded-lg object-cover"
    />
  </figure>

  <div className="card-body lg:w-1/2 flex flex-col gap-3 justify-start">
    <h2 className="card-title text-3xl">{skill.skillName}</h2>
    <p className="text-lg font-semibold">Provider: {skill.providerName}</p>
    <p className="text-lg text-gray-700">Email: {skill.providerEmail}</p>

    <div className="flex items-center gap-2">
      <div className="rating">
        {[...Array(5)].map((_, i) => (
          <input
            key={i}
            type="radio"
            name={`rating-${skill.skillId}`}
            className="mask mask-star-2 bg-orange-500"
            checked={i < Math.floor(skill.rating)}
            readOnly
          />
        ))}
      </div>
      <span className='font-semibold'>{skill.rating}</span>
    </div>

    <p className="text-lg font-semibold  ">Price: ${skill.price}<span className='text-gray-700'>/session</span></p>
    <p className="text-lg font-medium">Slots Available: {skill.slotsAvailable}</p>
    <p className="text-lg font-medium ">Category: {skill.category}</p>
    <p className='text-gray-600' >{skill.description}</p>

    <div className="divider my-4"></div>

    <h3 className="text-xl font-bold">Book a Session</h3>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Your name"
          className="input input-bordered"
          required
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Your email"
          className="input input-bordered"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Book Session
      </button>
    </form>
  </div>
</div>

  );
};

export default SkillDetails;
