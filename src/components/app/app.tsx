import '../../index.css';
import styles from './app.module.css';

import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import ProtectedRoute from '../protected-route';
import { getIngredientsList } from '../../slices/ingredients';
import { apiGetUser } from '../../slices/user';

const routes = {
  home: '/',
  feed: '/feed',
  feedNum: '/feed/:number',
  ingredients: '/ingredients/:id',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  profile: '/profile',
  profileOrders: '/profile/orders',
  profileOrdersNum: '/profile/orders/:number',
  notFound: '*'
};

const App = () => {
  const dispatch = useDispatch(),
    navigate = useNavigate(),
    location = useLocation(),
    background = location.state?.background;

  useEffect(() => {
    dispatch(getIngredientsList());
    dispatch(apiGetUser());
  }, []);

  const pages = [
    { path: routes.home, element: <ConstructorPage /> },
    { path: routes.feed, element: <Feed /> },
    { path: routes.ingredients, element: <IngredientDetails /> },
    { path: routes.feedNum, element: <OrderInfo /> },
    { path: routes.login, element: <Login />, onlyUnAuth: true },
    { path: routes.register, element: <Register />, onlyUnAuth: true },
    {
      path: routes.forgotPassword,
      element: <ForgotPassword />,
      onlyUnAuth: true
    },
    {
      path: routes.resetPassword,
      element: <ResetPassword />,
      onlyUnAuth: true
    },
    { path: routes.profile, element: <Profile />, protected: true },
    { path: routes.profileOrders, element: <ProfileOrders />, protected: true },
    { path: routes.profileOrdersNum, element: <OrderInfo />, protected: true },
    { path: routes.notFound, element: <NotFound404 /> }
  ];

  const modals = [
    { path: routes.feedNum, title: '', element: <OrderInfo /> },
    {
      path: routes.ingredients,
      title: 'Детали ингредиента',
      element: <IngredientDetails />
    },
    {
      path: routes.profileOrdersNum,
      title: '',
      element: (
        <ProtectedRoute>
          <OrderInfo />
        </ProtectedRoute>
      )
    }
  ];

  const wrapElement = ({ element, onlyUnAuth, protected: isProtected }: any) =>
    onlyUnAuth ? (
      <ProtectedRoute onlyUnAuth>{element}</ProtectedRoute>
    ) : isProtected ? (
      <ProtectedRoute>{element}</ProtectedRoute>
    ) : (
      element
    );

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {pages.map(({ path, ...props }, i) => (
          <Route key={i} path={path} element={wrapElement(props)} />
        ))}
      </Routes>
      {background && (
        <Routes>
          {modals.map(({ path, title, element }, i) => (
            <Route
              key={i}
              path={path}
              element={
                <Modal title={title} onClose={() => navigate(-1)}>
                  {element}
                </Modal>
              }
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
