import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

// Access environment variables directly
const { VITE_CLERK_PUBLISHABLE_KEY: PUBLISHABLE_KEY } = import.meta.env;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>,
  document.getElementById('root')
);
