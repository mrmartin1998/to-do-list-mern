import LoginUser from '@/components/users/LoginUser';

const LoginPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome Back</h1>
        <LoginUser />
      </div>
    </div>
  );
};

export default LoginPage; 