import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const HomePage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const CustomersPage = lazy(() => import('src/pages/customers'));
export const CustomerProfilePage = lazy(() => import('src/pages/customer-profile'));
export const EmployeesPage = lazy(() => import('src/pages/employees'));
export const CalendarPage = lazy(() => import('src/pages/calendar'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'dashboard', element: <HomePage /> },
        { path: 'customers', element: <CustomersPage /> },
        { path: 'customer-profile', element: <CustomerProfilePage /> },
        { path: 'employees', element: <EmployeesPage /> },
        { path: 'calendar', element: <CalendarPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '',
      element: <LoginPage />, index: true,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
