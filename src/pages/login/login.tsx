import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { login } from '../../slices/user';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(localStorage.getItem('email') ?? '');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    localStorage.setItem('email', email);
    dispatch(login({ email, password }));
  };

  return (
    <LoginUI
      errorText=''
      {...{ email, setEmail, password, setPassword, handleSubmit }}
    />
  );
};
