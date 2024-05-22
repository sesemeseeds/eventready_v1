import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

// Access environment variables directly
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY in your .env file.");
}

ReactDOM.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App/>
  </ClerkProvider>,
  document.getElementById('root')
);
