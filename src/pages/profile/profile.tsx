import { ProfileUI } from '@ui-pages';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUser, updateUser } from '../../slices/user';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(
    () =>
      setFormValue((f) => ({
        ...f,
        name: user?.name || '',
        email: user?.email || ''
      })),
    [user]
  );

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => (
    e.preventDefault(), dispatch(updateUser(formValue))
  );
  const handleCancel = (e: SyntheticEvent) => (
    e.preventDefault(),
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    })
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormValue((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));

  return (
    <ProfileUI
      {...{
        formValue,
        isFormChanged,
        handleCancel,
        handleSubmit,
        handleInputChange
      }}
    />
  );
};
