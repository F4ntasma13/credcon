// Importa os hooks e componentes necessários do React e do Next.js.
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useAuthContext } from 'src/contexts/auth-context';

// Cria um componente chamado 'AuthGuard' para proteger rotas autenticadas.
export const AuthGuard = (props) => {
  const { children } = props; // Extrai as propriedades passadas, especialmente 'children'.
  const router = useRouter(); // Obtém o objeto de roteamento do Next.js.
  const { isAuthenticated } = useAuthContext(); // Obtém o estado de autenticação do contexto.
  const ignore = useRef(false); // Utiliza um ref para controlar chamadas múltiplas.
  const [checked, setChecked] = useState(false); // Utiliza estado local para controle.

  // Realiza a verificação de autenticação somente quando o componente é montado.
  useEffect(
    () => {
      if (!router.isReady) {
        return; // Se o roteamento não estiver pronto, não faz nada.
      }

      // Evita chamar duas vezes em modo de desenvolvimento com React.StrictMode habilitado.
      if (ignore.current) {
        return;
      }

      ignore.current = true; // Marca que a verificação foi realizada.

      // Se o usuário não estiver autenticado, redireciona para a página de login.
      if (!isAuthenticated) {
        console.log('Não autenticado, redirecionando');
        router
          .replace({
            pathname: '/auth/login',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
          .catch(console.error);
      } else {
        setChecked(true); // Marca que a verificação foi concluída com sucesso.
      }
    },
    [router.isReady]
  );

  // Se 'checked' for falso, não renderiza nada.
  if (!checked) {
    return null;
  }

  // Se chegou aqui, significa que o redirecionamento não ocorreu e o usuário está autenticado/autorizado.

  return children; // Renderiza os componentes filhos (rotas protegidas).
};

// Define as propriedades esperadas para o 'AuthGuard'.
AuthGuard.propTypes = {
  children: PropTypes.node
};

