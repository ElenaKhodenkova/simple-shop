import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './CartPage.module.css';



export default function CartPage({ user }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/carts/${user.id}`)
      .then((cart) => {
        setEntries(cart.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const deleteProduct = async (id) => {
        
    const res = await axiosInstance.delete(`${import.meta.env.VITE_API}/carts/${id}`)
    if (res.status === 200){
      setEntries((prev) => prev.filter((el) => el.Product.id !== id))

    }

  }
  
  return (
    <>
      <div className={styles.wrapper}></div>
      <div className={styles.wrapper}>
        {entries.length
          ? entries.map((el) => (
              <div className="card" key={el.id} style={{ width: '18rem' }}>
                <div className="card-body">
                  <h5 className="card-title">{el.Product.name}</h5>
                  <p className="card-text">{el.Product.price}</p>
                  <p className="card-text">{el.Product.description}</p>
                  <img src={el.Product.image} className="border border-info rounded" />
                  <button onClick={() => deleteProduct(el.Product.id)}>Удалить</button>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
