import './App.css'
import { SignOutButton, SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react"

function App() {
  function redirect(arg0: string): void | Promise<any> {
    throw new Error('Function not implemented.')
  }

  return (
    <div>
      <SignedOut>
      <SignInButton />
        <p>This content is public. Only signed out users can see this.</p>
      </SignedOut>
      <SignedIn>
      <SignOutButton signOutCallback={() => redirect('/')} />
        <p>This content is private. Only signed in users can see this.</p>
      </SignedIn>
    </div>
  )
}

export default App
