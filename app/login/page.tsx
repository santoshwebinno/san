'use client';
import { useState } from 'react';
import styles from './Login.module.css';

export default function Login() {
  const [shop, setShop] = useState("");

  const handleSyncDatabase = async () => {
    try {
      const response = await fetch('/api/sync-db');
      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Login with your store URL</h1>
        <div className={styles.card}>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    value={shop}
                    onChange={e => setShop(e.target.value)}
                    placeholder="your-store-name"
                />
                <div className={styles.myShopify}>.myshopify.com</div>
            </div>
            <a href={`/api/auth/offline?shop=${shop}.myshopify.com`}>
                <button 
                    disabled={shop === ""} 
                    className={styles.button} 
                    onClick={handleSyncDatabase}
                >
                    Login
                </button>
            </a>
            <button 
                
                    className={styles.button} 
                    onClick={handleSyncDatabase}
                >
                    db
                </button>
        </div>
    </div>
);
}
