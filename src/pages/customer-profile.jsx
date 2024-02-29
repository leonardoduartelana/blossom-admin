import { Helmet } from 'react-helmet-async';

import { CustomerProfileView } from 'src/sections/user/profile/';

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
