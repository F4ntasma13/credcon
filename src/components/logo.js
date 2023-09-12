// Importa a função 'useTheme' do Material-UI para acessar o tema do aplicativo.
import { useTheme } from '@mui/material/styles';

// Cria o componente funcional 'Logo'.
export const Logo = () => {
  // Obtém o tema atual do aplicativo usando 'useTheme'.
  const theme = useTheme();
  // Extrai a cor principal do tema e atribui a 'fillColor'.
  const fillColor = theme.palette.primary.main;

  // Retorna um elemento 'img' com a fonte da imagem, texto alternativo e estilo.
  return (
    <img
      src="https://credcall.com.br/wp-content/uploads/2020/11/simbolo1.png" 
      alt="logo CredCall assessoria"
      style={{ height: '100%', width: 'auto' }}
    />
  );
};
