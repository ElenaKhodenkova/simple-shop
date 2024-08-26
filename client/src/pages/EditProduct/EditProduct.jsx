import { useState, useEffect } from 'react';
import styles from './EditProduct.module.css';
import axiosInstance from '../../axiosInstance';

export default function EditProduct({ productId }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/products/${productId}`)
      .then((response) => {
        const product = response.data;
        setName(product.name);
        setPrice(product.price);
        setDescription(product.description);
        setImage(product.image);
      })
      .catch((err) => console.error(err));
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.put(`${import.meta.env.VITE_API}/products/${productId}`, {
        name,
        price,
        description,
        image,
      });
      if (response.status === 200) {
        alert('Информация о товаре обновлена!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <label>
          Название товара:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Цена товара:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Описание товара:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Изображение товара:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button type="submit">Обновить товар</button>
      </form>
    </div>
  );
}