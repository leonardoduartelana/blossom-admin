import { Helmet } from 'react-helmet-async';

import EmployeeProfileView from "../sections/employee/profile/employee-profile-view";

// ----------------------------------------------------------------------

export default function EmployeeProfilePage() {
  return (
    <>
      <Helmet>
        <title> Employee Profile </title>
      </Helmet>

      <EmployeeProfileView />
    </>
  );
}
