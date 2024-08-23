import { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
import styles from './CartPage.module.css';

const productss = [
  {
    id: 1,
    name: 'наименование товара №1',
    price: 1000,
    description: 'описание товара №1',
    image: '/img/1.webp',
    count: 1,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 2,
    name: 'наименование товара №2',
    price: 2000,
    description: 'описание товара №2',
    image: '/img/2.webp',
    count: 2,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 3,
    name: 'наименование товара №3',
    price: 3000,
    description: 'описание товара №3',
    image: '/img/3.webp',
    count: 3,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 4,
    name: 'наименование товара №4',
    price: 4000,
    description: 'описание товара №4',
    image: '/img/4.webp',
    count: 4,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 5,
    name: 'наименование товара №5',
    price: 5000,
    description: 'описание товара №5',
    image: '/img/5.webp',
    count: 5,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 6,
    name: 'наименование товара №6',
    price: 6000,
    description: 'описание товара №6',
    image: '/img/6.webp',
    count: 6,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 7,
    name: 'наименование товара №7',
    price: 7000,
    description: 'описание товара №7',
    image: '/img/7.webp',
    count: 7,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 8,
    name: 'наименование товара №8',
    price: 8000,
    description: 'описание товара №8',
    image: '/img/8.webp',
    count: 8,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 9,
    name: 'наименование товара №9',
    price: 9000,
    description: 'описание товара №9',
    image: '/img/9.webp',
    count: 9,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
  {
    id: 10,
    name: 'наименование товара №10',
    price: 10000,
    description: 'описание товара №10',
    image: '/img/10.webp',
    count: 10,
    createdAt: '2024-08-22T07:44:10.735Z',
    updatedAt: '2024-08-22T07:44:10.735Z',
  },
];

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
                  
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
