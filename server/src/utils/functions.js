export function validateFields(inputData) {
  const errors = [];

  for (const field in inputData) {
    const value = inputData[field]?.trim();

    if (!value) {
      errors.push({
        field,
        error: `${field} is required`,
      });
      continue;
    }

    switch (field) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push({
            field,
            error: "Invalid email",
          });
        }
        break;

      case "phone":
        if (!/^\d{10}$/.test(value)) {
          errors.push({
            field,
            error: "Phone must be exactly 10 digits",
          });
        }
        break;

      case "password":
        if (value.length < 8 || value.length > 25) {
          errors.push({
            field,
            error: "Password must be 8–25 characters",
          });
        }
        break;

      case "username":
        if (value.length < 2 || value.length > 50) {
          errors.push({
            field,
            error: "Username must be 2–50 characters",
          });
        }
        break;

      default:
        if (value.length < 1 || value.length > 100) {
          errors.push({
            field,
            error: `${field} must be 1–100 characters`,
          });
        }
        break;
    }
  }

  return errors;
}
