import {UserRegisterForm} from "../types/auth.ts";

export const validateForm = (formData: UserRegisterForm) => {
  const newErrors: { [key: string]: string } = {};
  if (!formData.userName) newErrors.userName = 'User name is required.';
  if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address.';
  if (!formData.password || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/.test(formData.password)) {
    newErrors.password = 'Password must be 8-15 characters long, include uppercase and lowercase letters, numbers, and special characters.';
  }
  if (!formData.birthDate) newErrors.birthDate = 'Birth date is required.';
  if (!formData.countryId) newErrors.country = 'Please select a country.';
  return newErrors;
};