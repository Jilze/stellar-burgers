import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logout } from '../../slices/user';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  return (
    <ProfileMenuUI
      handleLogout={() => useDispatch()(logout())}
      pathname={pathname}
    />
  );
};
