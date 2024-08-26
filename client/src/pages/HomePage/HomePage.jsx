import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import axiosInstance from '../../axiosInstance';

const { VITE_API } = import.meta.env;

export default function HomePage({ user, productId }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/products`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addProduct = async (productId) => {
    try {
      const response = await axiosInstance.post(`${VITE_API}/carts/cart`, { productId });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axiosInstance.delete(`${VITE_API}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        setEntries((prev) => prev.filter((el) => el.id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        {entries.length ? (
          entries.map((el) => (
            <div className="card" key={el.id} style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{el.name}</h5>
                <p className="card-text">{el.price} рубликов</p>
                <p className="card-text">{el.description}</p>
                <img src={el.image} className="border border-info rounded" />
                <button onClick={() => addProduct(el.id)} className="btn btn-primary mt-2">
                  Добавить в корзину
                </button>
                <button className="btn btn-danger mt-2" onClick={() => deleteProduct(el.id)}>
                  Удалить
                </button>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </>
  );
}







   

