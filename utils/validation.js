// Validation utilities for data validation
export const validateContact = (data) => {
  const errors = [];

  // Required fields validation
  if (!data.firstName || typeof data.firstName !== 'string' || data.firstName.trim() === '') {
    errors.push('firstName is required and must be a non-empty string');
  }
  if (!data.lastName || typeof data.lastName !== 'string' || data.lastName.trim() === '') {
    errors.push('lastName is required and must be a non-empty string');
  }
  if (!data.email || typeof data.email !== 'string' || !isValidEmail(data.email)) {
    errors.push('email is required and must be a valid email address');
  }

  // Optional fields validation (if provided, they must be valid)
  if (data.phone && typeof data.phone !== 'string') {
    errors.push('phone must be a string');
  }
  if (data.address && typeof data.address !== 'string') {
    errors.push('address must be a string');
  }
  if (data.profession && typeof data.profession !== 'string') {
    errors.push('profession must be a string');
  }
  if (data.favoriteColor && typeof data.favoriteColor !== 'string') {
    errors.push('favoriteColor must be a string');
  }
  if (data.birthday && !isValidDate(data.birthday)) {
    errors.push('birthday must be a valid date (YYYY-MM-DD)');
  }

  return errors;
};

export const validateProject = (data) => {
  const errors = [];

  // Required fields validation
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('name is required and must be a non-empty string');
  }
  if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
    errors.push('description is required and must be a non-empty string');
  }
  if (!data.status || typeof data.status !== 'string') {
    errors.push('status is required and must be a string');
  }
  if (!['pending', 'in_progress', 'completed', 'on_hold'].includes(data.status)) {
    errors.push('status must be one of: pending, in_progress, completed, on_hold');
  }

  // Optional fields validation (if provided)
  if (data.startDate && !isValidDate(data.startDate)) {
    errors.push('startDate must be a valid date (YYYY-MM-DD)');
  }
  if (data.endDate && !isValidDate(data.endDate)) {
    errors.push('endDate must be a valid date (YYYY-MM-DD)');
  }
  if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
    errors.push('priority must be one of: low, medium, high');
  }
  if (data.tags && !Array.isArray(data.tags)) {
    errors.push('tags must be an array');
  }

  return errors;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidDate = (dateString) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateString)) return false;
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
