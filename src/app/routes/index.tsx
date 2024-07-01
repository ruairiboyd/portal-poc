/* eslint-disable react/react-in-jsx-scope */
import ErrorPage from './errorPage';
import Root from './root';
import AppLayout from './AppLayout';
import { createBrowserRouter } from 'react-router-dom';
import Releases from './Releases';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/releases',
        element: <Releases />,
      },
    ],
  },
]);
