import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './CartPage.module.css';

const { VITE_API } = import.meta.env;

export default function CartPage({ user }) {
  const [entries, setEntries] = useState([]);
  const [cartItems, setCartItems] = useState([]); // Добавили состояние для товаров в корзине

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/carts/${user.id}`)
      .then((cart) => {
        setEntries(cart.data);
      })
      .catch((err) => console.error(err));
  }, []);


  // Получаем товары в корзине при загрузке компонента
  useEffect(() => {
    if (user) {
      // Проверяем, авторизован ли пользователь
      axiosInstance
        .get(`${import.meta.env.VITE_API}/carts/cart`) // Запрос на получение корзины
        .then((res) => {
          setCartItems(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user]);


  const deleteProduct = async (productId) => {
    try {
      //await axiosInstance.delete(`${VITE_API}/carts/cart/${productId}`, { productId });
           
      await axiosInstance({method: "delete", params: productId, url:`http://localhost:3100${VITE_API}/carts/cart/${productId.id}`});
    } catch (error) {
      console.error('Ошибка удаления товара', error);
    }
  };

  return (
    <>
      <div className={styles.wrapper}></div>
      <div className={styles.wrapper}>
        {entries.length
          ? entries.map((el) => (
              <div className="card" key={el.id} style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">{el.Product.name}</h5>
                  <p className="card-text">цена товара {el.Product.price} руб.</p>
                  <p className="card-text">{el.count}</p>
                  <p className="card-text">{el.Product.description}</p>
                  <img src={el.Product.image} className="border border-info rounded" />
                     <button
                        onClick={() => deleteProduct(el)}
                        className="btn btn-primary mt-2"
                      >
                        Удалить из корзины
                      </button>
                    
                    
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
