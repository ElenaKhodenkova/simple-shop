import axiosInstance, { setAccessToken } from '../../axiosInstance';
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    const response = await axiosInstance.get(
      `${import.meta.env.VITE_API}/auth/logout`
    );
    if (response.status === 200) {
      setUser({});
      setAccessToken('');
      navigate('/');
    }
  };

  return (
    <nav className={styles.wrapper}>
      <div className={styles.center}>
        <Link to='/'>На главную</Link>
      </div>
      <div className={styles.center}>
        {user?.email ? (
          <>
            <Link to='/cart'> Корзина </Link>
            <Link to='/add-product'> Добавить товар </Link>
            <Link to='/edit-product'> Редактировать товар </Link>
            <Link onClick={logoutHandler}> Выйти </Link>
          </>
        ) : (
          <>
            <Link to='/signin'> Войти </Link>
            <Link to='/signup'> Регистрация </Link>
          </>
        )}
      </div>
    </nav>
  );
}
