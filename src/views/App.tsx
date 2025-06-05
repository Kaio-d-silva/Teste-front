import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes, { RouteConfig } from '../config/routes';

const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>{renderRoutes(routes)}</Routes>
    </Router>
  );
};

export default App;
