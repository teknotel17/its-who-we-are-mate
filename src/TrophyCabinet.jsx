import React from 'react';

function TrophyCabinet() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '4rem', color: '#991b1b' }}>404 - Trophy Cabinet Not Found</h1>
      <p style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
        Sorry, this page doesn't exist... just like Tottenham's recent silverware.
      </p>
      <a href="/" style={{ marginTop: '2rem', display: 'inline-block', fontSize: '1.2rem', color: '#2563eb' }}>
        Go back to the roast
      </a>
    </div>
  );
}

export default TrophyCabinet;
