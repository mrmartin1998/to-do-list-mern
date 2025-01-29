import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { userService } from '@/services/api';
import { useToast } from '@/contexts/ToastContext';
import PasswordStrength from '@/components/common/PasswordStrength';

const RegisterUser = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [apiError, setApiError] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting },
    trigger
  } = useForm({
    mode: 'onChange'
  });

  const password = watch('password', '');

  const validateUsername = async (username) => {
    if (username.length < 3) return 'Username must be at least 3 characters';
    
    setIsCheckingUsername(true);
    try {
      const response = await userService.checkUsername(username);
      setIsCheckingUsername(false);
      return response.available || 'Username is already taken';
    } catch (error) {
      setIsCheckingUsername(false);
      return 'Error checking username availability';
    }
  };

  const onSubmit = async (data) => {
    try {
      setApiError('');
      const response = await userService.createUser(data);
      
      if (response.status === 'success') {
        showToast({
          message: 'Registration successful! Please log in.',
          type: 'success'
        });
        navigate('/login');
      } else {
        setApiError(response.message || 'Registration failed');
        showToast({
          message: response.message || 'Registration failed',
          type: 'error'
        });
      }
    } catch (error) {
      const errorMessage = 'An error occurred during registration';
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
        <h2 className="card-title">Register</h2>
        
        {apiError && (
          <div className="alert alert-error" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Username</span>
            </label>
            <div className="relative">
              <input
                id="username"
                type="text"
                className={`input input-bordered w-full ${errors.username ? 'input-error' : ''}`}
                {...register('username', {
                  required: 'Username is required',
                  validate: validateUsername
                })}
                aria-invalid={errors.username ? 'true' : 'false'}
                onChange={(e) => {
                  register('username').onChange(e);
                  trigger('username');
                }}
              />
              {isCheckingUsername && (
                <span className="loading loading-spinner loading-sm absolute right-3 top-3" />
              )}
            </div>
            {errors.username && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.username.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.email.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              className={`input input-bordered ${errors.password ? 'input-error' : ''}`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain uppercase, lowercase, number and special character'
                }
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {password && <PasswordStrength password={password} />}
            {errors.password && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.password.message}
                </span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="confirmPassword">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`input input-bordered ${errors.confirmPassword ? 'input-error' : ''}`}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            {errors.confirmPassword && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.confirmPassword.message}
                </span>
              </label>
            )}
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="link link-primary">
            Already have an account? Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser; 