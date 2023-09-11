import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
      src="https://credcall.com.br/wp-content/uploads/2020/11/simbolo1.png" 
      alt="logo"
      style={{ height: '100%', width: 'auto' }}
    />
  
  );
};
