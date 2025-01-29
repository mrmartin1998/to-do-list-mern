import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage; 