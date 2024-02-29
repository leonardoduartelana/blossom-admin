import { Helmet } from 'react-helmet-async';

import { CustomersView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function CustomersPage() {
  return (
    <>
      <Helmet>
        <title> Customers </title>
      </Helmet>

      <CustomersView />
    </>
  );
}
