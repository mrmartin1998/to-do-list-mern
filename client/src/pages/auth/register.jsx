import RegisterUser from '@/components/users/RegisterUser';

const RegisterPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>
        <RegisterUser />
      </div>
    </div>
  );
};

export default RegisterPage; 