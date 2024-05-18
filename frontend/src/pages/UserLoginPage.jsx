import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const UserLoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const navigate = useNavigate();
  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>;
  }

  if (isSignedIn) {

    navigate('/dashboard');

    return null;
  }

  return (
    <div>
      <header>
        <h1>User Login Page</h1>
        {isSignedIn ? (
          <div>
            <UserButton />
            <span>Hello {user.fullName}!</span>
       
          </div>
        ) : (
          <div>
            <SignInButton />
            <span>Not signed in</span>
          </div>
        )}
      </header>
    </div>
  );
};

export default UserLoginPage;