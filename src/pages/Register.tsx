import React, {useEffect, useState} from 'react';
import {
  CircularProgress,
  Container,
} from '@mui/material';
import RegisterForm from "../components/Register/RegisterForm.tsx";
import {useFetchCountriesQuery} from "../features/api/preferencesApi.ts";
import {validateForm} from "../utils/validateForm.ts";
import {useLoginUserMutation, useRegisterUserMutation} from "../features/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {MIN_HEIGHT_CONTAINER} from "../constants/constants.ts";
import type {UserRegisterForm} from "../types/auth.ts";
import {useDispatch} from "react-redux";
import {setToken} from "../features/auth/authSlice.ts";
import {toast} from "sonner";

function Register() {
  const [formData, setFormData] = useState<UserRegisterForm>({
    userName: '',
    email: '',
    password: '',
    birthDate: '',
    countryId: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [registerUser, {
    isLoading: loadingFormSubmit,
    isSuccess: registrationSuccess,
    error: registrationError
  }] = useRegisterUserMutation();
  const [loginUser, {isLoading: loginLoading, isSuccess: loginSuccess}] = useLoginUserMutation();
  const {data: countriesData, isLoading: loadingCountries} = useFetchCountriesQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    await registerUser(formData).unwrap();
  };

  useEffect(() => {


    if (registrationSuccess) {
      const loginUserAfterRegistration = async () => {
        const {token} = await loginUser({email: formData.email, password: formData.password}).unwrap();
        dispatch(setToken(token));
      }

      loginUserAfterRegistration();
    }
  }, [registrationSuccess, loginUser, formData.email, formData.password, dispatch]);

  useEffect(() => {
    if (registrationError && 'status' in registrationError && registrationError.status === 400) {
      toast.error('User with this email already exists');
    }
  }, [registrationError]);

  useEffect(() => {
    if (loginSuccess) {
      toast.success('Successfully registered and logged in!');
      navigate('/movies');
    }
  }, [loginSuccess, navigate]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: MIN_HEIGHT_CONTAINER,
      }}
    >
      {loadingCountries || loginLoading ?
        <CircularProgress size={24} sx={{color: 'white'}}/>
        :
        <RegisterForm formData={formData} handleChange={handleChange} countries={countriesData} errors={errors}
                      handleSubmit={handleSubmit} loading={loadingFormSubmit}/>
      }
    </Container>
  );
}

export default Register;
