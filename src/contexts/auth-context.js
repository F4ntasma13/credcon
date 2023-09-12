// Importa os hooks e componentes necessários do React.
import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

// Define constantes para ações possíveis no reducer.
const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

// Define o estado inicial do contexto de autenticação.
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

// Define os handlers para as ações no reducer.
const handlers = {
  // Handler para ação INITIALIZE: Atualiza o estado com base no payload (usuário).
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user ? ({ isAuthenticated: true, isLoading: false, user }) : ({ isLoading: false }))
    };
  },
  // Handler para ação SIGN_IN: Atualiza o estado para indicar que o usuário está autenticado.
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  // Handler para ação SIGN_OUT: Atualiza o estado para indicar que o usuário saiu da autenticação.
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

// Define o reducer que atualiza o estado com base nas ações.
const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// Cria o contexto de autenticação.
export const AuthContext = createContext({ undefined });

// Cria o provedor de autenticação que fornece o contexto para a aplicação.
export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  // Função para inicializar a autenticação.
  const initialize = async () => {
    // Evita chamar duas vezes em modo de desenvolvimento com React.StrictMode habilitado.
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    // Inicializa o estado com base na autenticação.
    if (isAuthenticated) {
      const user = {
        id: '777',
        avatar: '/assets/avatars/Pedro.jpg',
        name: 'Pedro Junior',
        email: 'pedroj@credcall.com.br',
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // Evita avisos sobre dependências de useEffect vazias.
    []
  );

  // Função para pular autenticação (utilizada em desenvolvimento).
  const skip = () => {
    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
        id: '777',
        avatar: '/assets/avatars/Pedro.jpg',
        name: 'Pedro Junior',
        email: 'pedroj@credcall.com.br',
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  // Função para fazer login.
  const signIn = async (email, password) => {
    if (email !== 'pedroj@credcall.com.br' || password !== '777') {
      throw new Error('Por favor, verifique seu email e senha');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
    } catch (err) {
      console.error(err);
    }

    const user = {
      id: '777',
      avatar: '/assets/avatars/Pedro.jpg',
      name: 'Pedro Junior',
      email: 'pedroj@credcall.com.br',
    };

    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
  };

  // Função para fazer cadastro (Cadastro com o Back-end).
  const signUp = async (email, name, password) => {
    throw new Error('Cadastro não implementado');
  };

  // Função para sair da autenticação.
  const signOut = () => {
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    // Fornece o contexto de autenticação para os componentes filhos.
    <AuthContext.Provider
      value={{
        ...state,
        skip,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Define o tipo de propriedades esperadas para o AuthProvider.
AuthProvider.propTypes = {
  children: PropTypes.node
};

// Exporta o consumidor de autenticação para uso em componentes.
export const AuthConsumer = AuthContext.Consumer;

// Exporta um hook personalizado para acessar o contexto de autenticação.
export const useAuthContext = () => useContext(AuthContext);
