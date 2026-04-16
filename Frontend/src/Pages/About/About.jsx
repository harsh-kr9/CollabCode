import React from 'react';
import { Navbar } from '../../Components';

const About = () => {
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-primary-content relative flex flex-col items-center justify-center p-6'>
        <img src="/shape.svg" alt="shape" className='absolute inset-0 w-full h-full object-cover opacity-40 pointer-events-none' />
        
        <div className="mockup-phone border-primary z-10 w-full max-w-sm shadow-2xl">
          <div className="camera"></div>
          <div className="display border-2">
            <div className="container mx-auto p-5 w-full bg-base-300">
              <h2 className="text-base font-bold mb-2">Step 1: Sign Up or Log In</h2>
              <p className="mb-6 text-sm">Create an account or log in using your email or social authentication.</p>

              <h2 className="text-base font-bold mb-2">Step 3: Collaborate in Real Time</h2>
              <p className="mb-6 text-sm">Collaborate with team members in real-time using the collaborative code editor.</p>

              <h2 className="text-base font-bold mb-2">Step 4: Communication and Assistance</h2>
              <p className="mb-6 text-sm">Communicate with your collaborators using the built-in chat feature. Optionally, use AI assistance for code suggestions and optimizations.</p>

              <h2 className="text-base font-bold mb-2">Step 5: Save and Share Session</h2>
              <p className="mb-6 text-sm">Save your progress during the coding session and share the session link with others for collaboration.</p>

              <h2 className="text-base font-bold mb-2">Step 6: Log Out</h2>
              <p className="text-sm">When finished, securely log out of the application to end your session.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
