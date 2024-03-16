import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const UserLoginPage = () => {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    // Handle loading state however you like
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        <h1>User Login Page</h1>
        {isSignedIn ? (
          <div>
            <UserButton />
            <p>Hello {user.fullName}!</p>
          </div>
        ) : (
          <div>
            <SignInButton />
            <p>Not signed in</p>
          </div>
        )}
      </header>
    </div>
  );
};

export default UserLoginPage;