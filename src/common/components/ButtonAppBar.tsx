import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Box, Toolbar } from '@mui/material';
import { authThunks, selectIsLoggedIn } from 'features/auth/model/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useSelector } from 'react-redux';

export function ButtonAppBar() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(authThunks.logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
