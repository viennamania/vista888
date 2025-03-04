
import Dashboard from '@/app/shared-corky/dashboard';


import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Files'),
};

export default function Page() {
  return <Dashboard />;
}
