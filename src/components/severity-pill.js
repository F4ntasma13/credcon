// Importa PropTypes para validar as propriedades passadas para o componente.
import PropTypes from 'prop-types';
// Importa a função 'styled' do Material-UI para criar componentes estilizados.
import { styled } from '@mui/material/styles';

// Cria um componente estilizado chamado 'SeverityPillRoot' usando 'styled'.
// Recebe 'theme' e 'ownerState' como argumentos.
const SeverityPillRoot = styled('span')(({ theme, ownerState }) => {
  // Calcula a cor de fundo com base na paleta de cores do tema e na cor definida em 'ownerState'.
  const backgroundColor = theme.palette[ownerState.color].alpha12;
  // Calcula a cor do texto com base na paleta de cores do tema, dependendo do modo de luz/escuro.
  const color = theme.palette.mode === 'dark'
    ? theme.palette[ownerState.color].main
    : theme.palette[ownerState.color].dark;

  // Define um conjunto de estilos CSS para o componente 'SeverityPillRoot'.
  return {
    alignItems: 'center', // Alinha os elementos verticalmente ao centro.
    backgroundColor, // Define a cor de fundo calculada.
    borderRadius: 12, // Adiciona bordas arredondadas.
    color, // Define a cor do texto calculada.
    cursor: 'default', // Define o cursor do mouse como padrão.
    display: 'inline-flex', // Exibe o componente como flexível e inline.
    flexGrow: 0, // Não permite que o componente cresça ao ocupar espaço extra.
    flexShrink: 0, // Não permite que o componente encolha quando há espaço insuficiente.
    fontFamily: theme.typography.fontFamily, // Define a família de fontes do tema.
    fontSize: theme.typography.pxToRem(12), // Define o tamanho da fonte em relação ao tema.
    lineHeight: 2, // Define a altura da linha da fonte.
    fontWeight: 600, // Define o peso da fonte (600 = semi-negrito).
    justifyContent: 'center', // Alinha os elementos horizontalmente ao centro.
    letterSpacing: 0.5, // Define o espaçamento entre caracteres.
    minWidth: 20, // Define a largura mínima do componente.
    paddingLeft: theme.spacing(1), // Define o preenchimento à esquerda com base no espaçamento do tema.
    paddingRight: theme.spacing(1), // Define o preenchimento à direita com base no espaçamento do tema.
    textTransform: 'uppercase', // Transforma o texto em maiúsculas.
    whiteSpace: 'nowrap' // Impede a quebra de texto em várias linhas.
  };
});

// Cria o componente 'SeverityPill'.
export const SeverityPill = (props) => {
  // Extrai as propriedades 'color' e 'children' do objeto 'props' com valores padrão.
  const { color = 'primary', children, ...other } = props;

  // Cria um objeto 'ownerState' com a propriedade 'color'.
  const ownerState = { color };

  // Renderiza o componente 'SeverityPillRoot' com as propriedades apropriadas.
  return (
    <SeverityPillRoot
      ownerState={ownerState}
      {...other}
    >
      {children}
    </SeverityPillRoot>
  );
};

// Define as propriedades esperadas e seus tipos para o componente 'SeverityPill'.
SeverityPill.propTypes = {
  children: PropTypes.node, // Propriedade 'children' deve ser um nó (elemento React).
  color: PropTypes.oneOf([ // Propriedade 'color' deve ser uma das cores definidas.
    'primary',
    'secondary',
    'error',
    'info',
    'warning',
    'success'
  ])
};
