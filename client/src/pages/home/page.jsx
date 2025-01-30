import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Welcome to Todo-MERN</h1>
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Streamline Your Tasks</h2>
            <p className="text-center">
              A powerful task management application built with the MERN stack.
              Organize your tasks efficiently with our modern, responsive interface.
            </p>
            
            <div className="divider">Built With</div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center p-4 bg-base-100 rounded-lg">
                <h3 className="font-bold mb-2">Frontend</h3>
                <ul className="list-disc list-inside">
                  <li>React</li>
                  <li>DaisyUI</li>
                  <li>TailwindCSS</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center p-4 bg-base-100 rounded-lg">
                <h3 className="font-bold mb-2">Backend</h3>
                <ul className="list-disc list-inside">
                  <li>MongoDB</li>
                  <li>Express.js</li>
                  <li>Node.js</li>
                </ul>
              </div>
            </div>

            <div className="card-actions justify-center mt-6">
              <Link to="/dashboard" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-ghost">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 


