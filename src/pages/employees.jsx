import { Helmet } from 'react-helmet-async';

import {EmployeesView} from "../sections/employee";

// ----------------------------------------------------------------------

export default function EmployeesPage() {
  return (
    <>
      <Helmet>
        <title> Employees </title>
      </Helmet>

      <EmployeesView />
    </>
  );
}
