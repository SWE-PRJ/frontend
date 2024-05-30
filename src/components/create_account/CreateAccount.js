'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/create_account/page.module.css';

export default function CreateAccount() {
  const router = useRouter();
  const [id, setID] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정 필요
    if (id && username && password) {
      router.push('/');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>계정 등록</h2>
      <div className={styles.role}>
        <div>
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="tester">Tester</option>
            <option value="developer">Developer</option>
            <option value="pl">PL</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your identifier"
          value={id}
          onChange={(e) => setID(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Create account</button>
      </form>
      
    </div>
  );
}
