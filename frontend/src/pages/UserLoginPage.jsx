import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import { Box, Typography, Paper, Button } from "@mui/material";
import "../styles/UserLoginPage.css";

const UserLoginPage = ({ handleLogin }) => {
  const { isSignedIn, user, isLoaded, signIn } = useUser();

  const handleSignIn = async () => {
    try {
      await signIn();
      handleLogin(); // Call the handleLogin function passed as a prop
    } catch (error) {
      console.error("Error signing in:", error);
      // Handle sign-in error
    }
  };

  if (!isLoaded) {
    // Handle loading state however you like
    return (
      <div className="centered">
        <Paper elevation={3} className="login-card">
          <Typography variant="h5" align="center" gutterBottom>
            Loading...
          </Typography>
        </Paper>
      </div>
    );
  }

  return (
    <div className="centered-container"> {/* Modified the class name */}
      <Paper elevation={3} className="login-card">
        <Typography variant="h4" align="center" gutterBottom>
          Event Ready
        </Typography>
        <Box mt={4} display="flex" flexDirection="column" alignItems="center">
          {isSignedIn ? (
            <>
              <UserButton />
              <Typography variant="h6" mt={2}>
                Hello, {user.fullName}!
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="body1" gutterBottom>
                Please sign in
              </Typography>
              <Button variant="contained" color="primary" onClick={handleSignIn} sx={{ mt: 2 }}>
                Sign In
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </div>
  );
};

export default UserLoginPage;
