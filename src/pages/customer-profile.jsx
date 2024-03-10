import { Helmet } from 'react-helmet-async';

import { CustomerProfileView } from 'src/sections/customer/profile/';

// ----------------------------------------------------------------------

export default function CustomerProfilePage() {
  return (
    <>
      <Helmet>
        <title> Customer Profile </title>
      </Helmet>

      <CustomerProfileView />
    </>
  );
}
