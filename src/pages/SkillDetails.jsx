import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetch('/skills.json')
      .then(res => res.json())
      .then(data => {
        const foundSkill = data.find(s => s.skillId === parseInt(id));
        setSkill(foundSkill);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skill:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Session booked successfully!');
    setFormData({ name: '', email: '' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
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
        <div className="mt-4">
          <Link to="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-1/2">
          <img src={skill.image} alt={skill.skillName} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl">{skill.skillName}</h2>
          <p className="text-lg font-semibold">by {skill.providerName}</p>
          <p className="text-gray-600">{skill.providerEmail}</p>
          <div className="flex items-center my-2">
            <div className="rating rating-md">
              {[...Array(5)].map((_, i) => (
                <input
                  key={i}
                  type="radio"
                  name="rating"
                  className="mask mask-star-2 bg-orange-400"
                  checked={i < Math.floor(skill.rating)}
                  readOnly
                />
              ))}
            </div>
            <span className="ml-2 text-lg">{skill.rating}</span>
          </div>
          <div className="badge badge-outline p-3 mb-4">{skill.category}</div>
          <p className="text-lg mb-4">{skill.description}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold">${skill.price}/session</div>
            <div className="text-lg">
              <span className="font-semibold">{skill.slotsAvailable}</span> slots available
            </div>
          </div>
          
          <div className="divider"></div>
          
          <h3 className="text-xl font-bold mb-4">Book a Session</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Your Name</span>
              </label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                className="input input-bordered" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Your Email</span>
              </label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="input input-bordered" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="form-control">
              <button type="submit" className="btn btn-primary">Book Session</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;