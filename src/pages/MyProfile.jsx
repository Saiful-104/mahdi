import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MyProfile = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-warning flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>Please login to view your profile</span>
        </div>
        <div className="mt-4 text-center">
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* User Profile Card */}
      <div className="card bg-base-100 shadow-xl max-w-md mx-auto">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 overflow-hidden">
              <img 
                src={currentUser.photoURL || '/default-avatar.png'} 
                alt={currentUser.displayName || 'User Avatar'} 
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">{currentUser.displayName || 'No Name'}</h2>
          <p className="text-lg">{currentUser.email}</p>
          <div className="card-actions justify-center mt-4">
            <Link to="/update-profile" className="btn btn-primary">Update Profile</Link>
          </div>
        </div>
      </div>

      {/* My Bookings Card */}
      <div className="max-w-md mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="card-title">My Bookings</h3>
            <p className="text-gray-600">You haven't booked any sessions yet.</p>
            <div className="card-actions justify-end mt-2">
              <Link to="/" className="btn btn-primary btn-sm">Browse Skills</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
