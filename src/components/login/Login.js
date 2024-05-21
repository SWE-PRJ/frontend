'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/login/page.module.css';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 인증 로직
    if (username == 'dd' && password) {
      router.push('/homepage-other');
    }
    else {
      alert('wrong!');
    }
  };

  return (
      <div className={styles.container}>
        <h2>로그인</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Sign in</button>
        </form>
        <a href="/create_account" className={styles.createAccount}>create an account</a>
      </div>
  );
}
