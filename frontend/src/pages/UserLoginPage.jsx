import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const UserLoginPage = () => {
    return (
        <><header>
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </header><h1>User Login Page</h1></>
    )
}

export default UserLoginPage;