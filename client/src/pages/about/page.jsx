import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Todo-MERN</h1>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center mb-4">Learning Project</h2>
            <p className="text-center mb-6">
              A full-stack application demonstrating MERN stack capabilities.
              Built for learning and showcasing modern web development practices.
            </p>
            
            <div className="divider">Tech Stack</div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title text-lg">Frontend Technologies</h3>
                  <ul className="list-disc list-inside">
                    <li>React (Vite)</li>
                    <li>TailwindCSS</li>
                    <li>DaisyUI</li>
                    <li>React Router</li>
                    <li>React Hook Form</li>
                  </ul>
                </div>
              </div>

              <div className="card bg-base-100 shadow-md">
                <div className="card-body">
                  <h3 className="card-title text-lg">Backend Technologies</h3>
                  <ul className="list-disc list-inside">
                    <li>Node.js</li>
                    <li>Express.js</li>
                    <li>MongoDB</li>
                    <li>JWT Authentication</li>
                    <li>REST API</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="divider">Features</div>
            
            <ul className="list-disc list-inside text-center">
              <li>User Authentication</li>
              <li>CRUD Operations</li>
              <li>Responsive Design</li>
              <li>Form Validation</li>
              <li>Error Handling</li>
            </ul>

            <div className="card-actions justify-center mt-6">
              <Link to="/" className="btn btn-primary">
                Back to Home
              </Link>
              <a 
                href="https://github.com/yourusername/todo-mern" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-ghost"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 