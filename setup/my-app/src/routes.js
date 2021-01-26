import React from 'react';
import { Navigate } from 'react-router-dom';
import { OAuthCallback } from '@carto/react/oauth';
import Main from 'components/views/Main';
import NotFound from 'components/views/NotFound';
import Home from 'components/views/Home';

import DynamicView from 'components/views/DynamicView.js';
import NewView from 'components/views/NewView.js';
import WidgetsView from 'components/views/WidgetsView.js';
// Auto import
const routes = [
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Navigate to='/home' /> },
      { path: '/dynamic', element: <DynamicView /> },

      { path: '/newView', element: <NewView /> },

      { path: '/widgets', element: <WidgetsView/> },

      // Auto import routes
      { path: '/home', element: <Home /> },
    ],
  },
  { path: '/oauthCallback', element: <OAuthCallback /> },
  { path: '404', element: <NotFound /> },
  { path: '*', element: <Navigate to='/404' /> },
];

export default routes;
