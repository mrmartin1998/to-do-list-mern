export const todoValidation = {
  title: {
    required: 'Title is required',
    minLength: {
      value: 3,
      message: 'Title must be at least 3 characters'
    },
    maxLength: {
      value: 50,
      message: 'Title must not exceed 50 characters'
    }
  },
  description: {
    maxLength: {
      value: 200,
      message: 'Description must not exceed 200 characters'
    }
  }
}; 