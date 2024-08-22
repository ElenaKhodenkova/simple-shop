import { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import styles from './List.module.css';

export default function List({user}) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
  axiosInstance
  .get(`${import.meta.env.VITE_API}/carts/${user.id}`)
  .then((cart) => {
    setEntries(cart.data)
  })
  .catch((err) => console.error(err));
}, []);

  return (
    <div className={styles.wrapper}>
      {entries.length
        ? entries.map((el) => (<div className="border border-info rounded" key={el.id}>{el.id}</div>
        
          ))
        : null} 
        
    </div>
  );
}
