import {Box, Button, CircularProgress, MenuItem, TextField, Typography} from "@mui/material";
import {Country} from "../../types/preferences.ts";
import {UserRegisterForm} from "../../types/auth.ts";
import React from "react";

type RegisterFormProps = {
  formData: UserRegisterForm;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors: { [key: string]: string };
  loading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  countries: Country[] | undefined;
}

function RegisterForm({formData, handleChange, errors, countries, handleSubmit, loading}: RegisterFormProps) {
  return (
    <>
      <Typography variant="h1" sx={{fontSize: '1.5rem', marginBottom: 3}}>
        Register
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          backgroundColor: 'background.paper',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        {/* User Information */}
        <TextField
          label="User Name"
          name="userName"
          fullWidth
          margin="normal"
          value={formData.userName}
          onChange={handleChange}
          error={!!errors.userName}
          helperText={errors.userName}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Birth Date"
          name="birthDate"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{shrink: true}}
          value={formData.birthDate}
          onChange={handleChange}
          error={!!errors.birthDate}
          helperText={errors.birthDate}
        />
        <TextField
          select
          label="Country"
          name="countryId"
          fullWidth
          margin="normal"
          value={formData.countryId}
          onChange={handleChange}
          error={!!errors.country}
          helperText={errors.country}
        >
          {countries?.map((country) => (
            <MenuItem key={country.countryCode} value={country.countryId}>
              {country.countryName}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{marginTop: 3}}
        >
          {loading ? <CircularProgress size={24} sx={{color: 'white'}}/> : 'Register'}
        </Button>
      </Box>
    </>
  )
}

export default RegisterForm;


