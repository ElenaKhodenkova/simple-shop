import { useState } from 'react';
import styles from './AuthForm.module.css';
//import { Input, Button } from '@chakra-ui/react';
import axiosInstance, { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ title, type = 'signin', setUser }) {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errorMessage, setErrorMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/auth/${type}`,
        inputs
      );
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);

      navigate('/');
    } 
    catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          
          setErrorMessage('Такой пользователь уже существует');
        } else if (error.response.status === 401) {
          
          setErrorMessage('Неверный пароль');
        } else {
          setErrorMessage('Произошла ошибка, попробуйте еще раз');
        }
      } else {
        console.error(error);
        setErrorMessage('Произошла ошибка, попробуйте еще раз');
      }
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>{title}</h3>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.inputs}>
        {type === 'signin' && (
          <>
            <input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='email'
              name='email'
              value={inputs?.email}
              placeholder='Эл.почта'
            />
            <input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='password'
              name='password'
              value={inputs?.password}
              placeholder='Пароль'
            />
          </>
        )}
        {type === 'signup' && (
          <>
            <input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='email'
              name='email'
              value={inputs?.email}
              placeholder='Эл.почта'
            />
            <input
              onChange={changeHandler}
              borderColor='#3f3e3e'
              type='password'
              name='password'
              value={inputs?.password}
              placeholder='Пароль'
            />
          </>
        )}
      </div>
      <div className={styles.btns}>
        {type === 'signin' && (
          <button onClick={submitHandler} type='submit' colorScheme='blue'>
            Вход
          </button>
        )}
        {type === 'signup' && (
          <button onClick={submitHandler} type='submit' colorScheme='blue'>
            Регистрация
          </button>
        )}
      </div>
    </form>
  );
}
