import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
  Button,
  Grid,
} from '@mui/material';

import { useFormik } from 'formik';

import { Navigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { loginTC } from '../../reducers/authReducer';

type ErrorsType = {
  email?: string;
  password?: string;
};

export const Login = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values));
    },
    validate: values => {
      const errors: ErrorsType = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 4) {
        errors.password = 'Password should be more than 4 symbols';
      }
      return errors;
      // if (!values.email) {
      //   return {
      //     email: 'Email is required',
      //   };
      // }
      // if (!values.password) {
      //   return {
      //     password: 'Password is required',
      //   };
      // }
    },
  });

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Grid container justifyContent="center" marginTop="50px">
      <Grid item xs={4}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel>
              <p>
                To log in get registered{' '}
                <a
                  href={'https://social-network.samuraijs.com/'}
                  target={'_blank'}
                  rel="noreferrer"
                >
                  here
                </a>
              </p>
              <p>or use common test account credentials:</p>
              <p> Email: free@samuraijs.com</p>
              <p>Password: free</p>
            </FormLabel>
            <FormGroup>
              <TextField
                type="email"
                label="Email"
                margin="normal"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: 'red' }}>{formik.errors.email}</div>
              ) : null}

              <TextField
                type="password"
                label="Password"
                margin="normal"
                {...formik.getFieldProps('password')}
              />

              {formik.touched.password && formik.errors.password ? (
                <div style={{ color: 'red' }}>{formik.errors.password}</div>
              ) : null}

              <FormControlLabel
                label={'Remember me'}
                control={
                  <Checkbox
                    {...formik.getFieldProps('rememberMe')}
                    checked={formik.values.rememberMe}
                  />
                }
              />
              <Button type={'submit'} variant={'contained'} color={'primary'}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  );
};

export default Login;
