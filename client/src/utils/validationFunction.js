export function validateFields(inputData) {
  console.log('Input Data:', inputData);

  for (const field in inputData) {
    const value = inputData[field]?.trim();

    if (!value && field !== 'regNumber' && field !== 'bio') {
      return {
        field,
        message: `${field} is required`,
      };
    }

    switch (field) {
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return {
            field,
            message: 'Invalid email',
          };
        }
        break;

      case 'phone':
        if (!/^\d{10}$/.test(value)) {
          return {
            field,
            message: 'Phone must be exactly 10 digits',
          };
        }
        break;

      case 'password':
        if (value.length < 8 || value.length > 25) {
          return {
            field,
            message: 'Password must be 8–25 characters',
          };
        }
        break;

      case 'username':
        if (value.length < 4 || value.length > 15) {
          return {
            field,
            message: 'Username must be 4–15 characters',
          };
        }
        break;

      case 'confirmPassword':
        if (value !== inputData.password) {
          return {
            field,
            message: 'Confirm password does not match password',
          };
        }
        if (value === '') {
          return {
            field,
            message: 'Confirm password is required',
          };
        }
        break;

      // default:
      //   if (value.length < 1 || value.length > 100) {
      //     return {
      //       field,
      //       message: `${field} must be 1–100 characters`,
      //     };
      //   }
      //   break;
    }
  }

  return null; // No errors found
}
