import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { Page } from './Page';

export const now = new Date();

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
