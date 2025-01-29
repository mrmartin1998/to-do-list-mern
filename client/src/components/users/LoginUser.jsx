import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { userService } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

const LoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [rememberMe, setRememberMe] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm();
  const [apiError, setApiError] = React.useState('');

  const onSubmit = async (data) => {
    try {
      setApiError('');
      const response = await userService.signIn({
        ...data,
        rememberMe
      });
      
      if (response.status === 'success') {
        login(response.data.user, response.data.token, rememberMe);
        showToast({
          message: 'Login successful! Welcome back.',
          type: 'success'
        });
        // Redirect to the page they tried to visit or dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from);
      } else {
        setApiError(response.message || 'Login failed');
        showToast({
          message: response.message || 'Login failed',
          type: 'error'
        });
      }
    } catch (error) {
      const errorMessage = 'An error occurred during login';
      setApiError(errorMessage);
      showToast({
        message: errorMessage,
        type: 'error'
      });
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center mb-4">Login to Your Account</h2>
        
        {apiError && (
          <div className="alert alert-error" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <label className="label" htmlFor="email-error">
                <span className="label-text-alt text-error" id="email-error">
                  {errors.email.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
              <Link 
                to="/forgot-password" 
                className="label-text-alt link link-primary"
              >
                Forgot password?
              </Link>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && (
              <label className="label" htmlFor="password-error">
                <span className="label-text-alt text-error" id="password-error">
                  {errors.password.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="label-text">Remember me</span>
            </label>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="divider">OR</div>

        <div className="text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="link link-primary">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginUser; 