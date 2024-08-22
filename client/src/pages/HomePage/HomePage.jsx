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
    await axiosInstance.post(`${VITE_API}/carts/cart`, { productId });
  };

  return (
    <>
      <div className={styles.wrapper}></div>
      <div className={styles.wrapper}>
        {entries.length
          ? entries.map((el) => {
              return (
                <div className="card" key={el.id} style={{ width: '18rem' }}>
                  <div className="card-body">
                    <h5 className="card-title">{el.name}</h5>
                    <p className="card-text">{el.price}</p>
                    <p className="card-text">{el.description}</p>
                    <img
                      src={el.image}
                      className="border border-info rounded"
                    />
                    <button
                      onClick={() => addProduct(el.id)}
                      className="btn btn-primary mt-2"
                    >
                      Купить
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}
