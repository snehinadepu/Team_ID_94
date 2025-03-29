import React from 'react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const Home = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="home">
      <h1>Welcome to Agricultural Marketplace</h1>
      {!isSignedIn ? (
        <div>
          <SignInButton />
          <SignUpButton />
        </div>
      ) : (
        <UserButton />
      )}
    </div>
  );
};

export default Home;
