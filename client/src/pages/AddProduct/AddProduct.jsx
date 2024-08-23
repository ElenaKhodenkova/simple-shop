import { useState } from 'react';
import styles from './AddProduct.module.css';
import axiosInstance from '../../axiosInstance';

export default function AddProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosInstance.post('/products', {
        name,
        price,
        description,
        image,
      });
      if (response.status === 200) {
        alert('Товар добавлен!');
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
        <button type="submit">Добавить товар</button>
      </form>
    </div>
  );
}