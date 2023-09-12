// Importa a função 'dynamic' do pacote 'next/dynamic' para importação dinâmica de componentes.
import dynamic from 'next/dynamic';
// Importa a função 'styled' do Material-UI para criar componentes estilizados.
import { styled } from '@mui/material/styles';

// Cria um componente dinâmico chamado 'ApexChart' usando 'dynamic'.
// Este componente importa 'react-apexcharts' somente no lado do cliente (SSR: false) e define uma função de carregamento nula (loading: () => null).
const ApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false, // Não renderiza no lado do servidor (Server-Side Rendering) para uso no lado do cliente.
  loading: () => null // Define uma função de carregamento nula para evitar exibição de um indicador de carregamento.
});

// Cria o componente 'Chart' estilizado usando 'styled'.
export const Chart = styled(ApexChart)``;

