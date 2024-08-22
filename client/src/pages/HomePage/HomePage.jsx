import { useState, useEffect } from 'react';
import styles from './HomePage.module.css';
import axiosInstance from '../../axiosInstance';
import List from '../../components/List';

export default function HomePage({ user }) {
  const [entries, setEntries] = useState([]);

   useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/products`)
      .then((res) => {
        setEntries(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <> 
    <div className={styles.wrapper}>
    <List user={user}/>
  </div>
    <div className={styles.wrapper}>
     { entries.length ? entries.map((el) => (<div className="card" key={el.id} style={{width: '18rem'}}>
    <div className="card-body">
    <h5 className="card-title">{el.name}</h5>
    <p className="card-text">{el.price}</p>
    <p className="card-text">{el.description}</p>
    <img src={el.image} className="border border-info rounded" />
    <a href="#" className="btn btn-primary mt-2">Купить</a>
  </div>
</div> 
        ))
        : null}
</div>
</>);
}



{/* name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    count: DataTypes.INTEGER, */}



   

