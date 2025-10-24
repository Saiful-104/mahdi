import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true
    });

    fetch('/skills.json')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching skills:', err);
        setLoading(false);
      });
  }, []);

  const topProviders = [
    { id: 1, name: 'Alex Martin', rating: 4.9, skills: 5, image: 'https://i.postimg.cc/LXpKq2qN/guitar.jpg' },
    { id: 2, name: 'Priya Sharma', rating: 4.9, skills: 3, image: 'https://i.postimg.cc/9QG9y2yW/yoga.jpg' },
    { id: 3, name: 'Giuseppe Rossi', rating: 4.8, skills: 4, image: 'https://i.postimg.cc/8CkXzKJ1/cooking.jpg' },
    { id: 4, name: 'Emma Wilson', rating: 4.7, skills: 6, image: 'https://i.postimg.cc/8zGQv9jK/marketing.jpg' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Slider */}
      <div className="mb-12" data-aos="fade-down">
        <Swiper
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper rounded-xl overflow-hidden h-96"
        >
          <SwiperSlide>
            <div className="hero h-96 bg-gradient-to-r from-primary to-secondary text-white">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Learn New Skills</h1>
                  <p className="mb-5">Connect with local experts and learn something new today.</p>
                  <Link to="/login" className="btn btn-primary">Get Started</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero h-96 bg-gradient-to-r from-accent to-primary text-white">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Share Your Expertise</h1>
                  <p className="mb-5">Teach others what you know and earn from your skills.</p>
                  <Link to="/signup" className="btn btn-primary">Join Now</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero h-96 bg-gradient-to-r from-secondary to-accent text-white">
              <div className="hero-content text-center">
                <div className="max-w-md">
                  <h1 className="mb-5 text-5xl font-bold">Build Your Community</h1>
                  <p className="mb-5">Connect with like-minded people in your local area.</p>
                  <Link to="/login" className="btn btn-primary">Explore Skills</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Popular Skills */}
      <section className="mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.slice(0, 6).map(skill => (
            <div key={skill.skillId} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="h-48">
                <img src={skill.image} alt={skill.skillName} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{skill.skillName}</h2>
                <p className="text-sm text-gray-600">by {skill.providerName}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="rating rating-sm">
                      {[...Array(5)].map((_, i) => (
                        <input
                          key={i}
                          type="radio"
                          name={`rating-${skill.skillId}`}
                          className="mask mask-star-2 bg-orange-400"
                          checked={i < Math.floor(skill.rating)}
                          readOnly
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{skill.rating}</span>
                  </div>
                  <div className="text-lg font-bold">${skill.price}/session</div>
                </div>
                <div className="card-actions justify-end mt-2">
                  <Link to={`/skill/${skill.skillId}`} className="btn btn-primary btn-sm">View Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Providers */}
      <section className="mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Rated Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProviders.map(provider => (
            <div key={provider.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <figure className="h-32">
                <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
              </figure>
              <div className="card-body text-center">
                <h3 className="card-title justify-center">{provider.name}</h3>
                <div className="flex items-center justify-center">
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name={`provider-rating-${provider.id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={i < Math.floor(provider.rating)}
                        readOnly
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">{provider.rating}</span>
                </div>
                <p className="text-sm text-gray-600">{provider.skills} skills offered</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="card-title justify-center">1. Find a Skill</h3>
              <p>Browse through our wide range of skills offered by local experts.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="card-title justify-center">2. Book a Session</h3>
              <p>Schedule a session at a time that works for both you and the instructor.</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="card-title justify-center">3. Learn & Connect</h3>
              <p>Attend your session and start learning something new!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra Section: Skill Categories */}
      <section className="mb-12" data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Music', 'Language', 'Fitness', 'Technology', 'Art', 'Cooking', 'Business', 'More'].map((category, index) => (
            <div key={index} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow cursor-pointer">
              <div className="card-body items-center text-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold">{category}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;