/**
 * @fileoverview Defines a Landing react component that renders a simple landing page.
 */
import React from 'react';

/**
 * Landing react component that renders a simple landing page.
 */
const Landing = () => {
  return (
    <section className="landing">
      <div className="landing-inner">
        <h1>Welcome to Github-Repo-Viewer</h1>
        <h3>Search for a user in the navigation above to view repositories.</h3>
      </div>
    </section>
  );
};

export default Landing;
