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
    AOS.init({ duration: 800, once: true });

    fetch('/skills.json')
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const topProviders = [
    { id: 1, name: 'Alex Martin', rating: 4.9, skills: 5, image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=60' },
    { id: 2, name: 'Priya Sharma', rating: 4.9, skills: 3, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=60' },
    { id: 3, name: 'Giuseppe Rossi', rating: 4.8, skills: 4, image: 'https://images.unsplash.com/photo-1601050690597-df9977daec8a?auto=format&fit=crop&w=900&q=60' },
    { id: 4, name: 'Emma Wilson', rating: 4.7, skills: 6, image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=60' }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">

      {/* Hero Slider */}
      <div data-aos="fade-down">
        <Swiper
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Navigation, Autoplay]}
          className="rounded-xl overflow-hidden h-80 md:h-96 shadow-lg"
        >
          {[
            { title: 'Learn New Skills', text: 'Connect with local experts and learn something new today.', link: '/login', btnText: 'Get Started', bg: 'from-primary to-secondary' },
            { title: 'Share Your Expertise', text: 'Teach others what you know and earn from your skills.', link: '/signup', btnText: 'Join Now', bg: 'from-accent to-primary' },
            { title: 'Build Your Community', text: 'Connect with like-minded people in your local area.', link: '/login', btnText: 'Explore Skills', bg: 'from-secondary to-accent' }
          ].map((slide, i) => (
            <SwiperSlide key={i}>
              <div className={`hero h-full bg-gradient-to-r ${slide.bg} text-white`}>
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="mb-5 text-3xl md:text-5xl font-bold">{slide.title}</h1>
                    <p className="mb-5">{slide.text}</p>
                    <Link to={slide.link} className="btn btn-primary">{slide.btnText}</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Popular Skills */}
      <section data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">Popular Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.slice(0,6).map(skill => (
            <div key={skill.skillId} className="card bg-base-100 shadow-md hover:shadow-2xl transition-all duration-300">
              <figure className="h-48 overflow-hidden">
                <img src={skill.image} alt={skill.skillName} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{skill.skillName}</h2>
                <p className="text-sm text-gray-600">by {skill.providerName}</p>
                <div className="flex items-center justify-between mt-2">
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
      <section data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">Top Rated Providers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topProviders.map(provider => (
            <div key={provider.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
              <figure className="h-32 overflow-hidden">
                <img src={provider.image} alt={provider.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
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
      <section data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Find a Skill', text: 'Browse wide range of skills offered by local experts.', icon: '🔍' },
            { title: 'Book a Session', text: 'Schedule a session at a time that works for both.', icon: '📅' },
            { title: 'Learn & Connect', text: 'Attend your session and start learning something new!', icon: '🎓' }
          ].map((step, i) => (
            <div key={i} className="card bg-primary text-white shadow-md hover:shadow-xl transition-all duration-300 text-center">
              <div className="card-body">
                <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">{step.icon}</div>
                <h3 className="card-title justify-center">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore Categories */}
      <section data-aos="fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center">Explore Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Music', 'Language', 'Fitness', 'Technology', 'Art', 'Cooking', 'Business', 'More'].map((category, index) => (
            <div key={index} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-center">
              <div className="card-body items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-2 text-white text-lg">🎯</div>
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
