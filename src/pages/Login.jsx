import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // এই দুটি hook নিতে হবে
  const { loginWithEmail, loginWithGoogle, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      // ইউজার যদি ইতিমধ্যে লগইন থাকে, তাহলে সে যেই পেজে যেতে চেয়েছিল সেখানে পাঠানো হবে
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    }
  }, [currentUser, navigate, location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await loginWithEmail(email, password);
      
      // এখানেই এই কোডটি ব্যবহার করতে হবে
      // সফল লগইনের পর ইউজারকে যেই পেজে যেতে চেয়েছিল সেখানে পাঠানো হবে
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    
    try {
      await loginWithGoogle();
      
      // Google লগইনের ক্ষেত্রেও একই কাজ করতে হবে
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Login to access your SkillSwap account and start learning or teaching new skills.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input 
                type="email" 
                placeholder="email" 
                className="input input-bordered" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="password" 
                  className="input input-bordered w-full pr-10" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              <label className="label">
                <Link to="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Login'}
              </button>
            </div>
            <div className="divider">OR</div>
            <div className="form-control">
              <button 
                type="button" 
                className="btn btn-outline btn-primary"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner"></span> : 'Login with Google'}
              </button>
            </div>
            <p className="text-center mt-2">
              Don't have an account? <Link to="/signup" className="link link-primary">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;