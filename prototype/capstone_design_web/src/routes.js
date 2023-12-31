import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import SignUpPage from './pages/SignUpPage';
import ForgotLoginPage from './pages/ForgotLoginPage';
import MyPage from './pages/MyPage'
import DepartmentPage from './pages/DepartmentPage'
/* import ClassImagePage from './pages/ClassImagePage'; */
import ClassManagePage from './pages/ClassManagePage';
import ClassroomPage from './pages/ClassroomPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/classManage" />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'mypage', element: <MyPage />},
        { path: 'department', element: <DepartmentPage />},
/*         { path: 'classImage', element: <ClassImagePage />}, */
        { path: 'classManage', element: <ClassManagePage/>},
        { path: 'classRoom', element: <ClassroomPage/>},
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signUp',
      element: <SignUpPage />,
    },
    {
      path: 'forgotLogin',
      element: <ForgotLoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
