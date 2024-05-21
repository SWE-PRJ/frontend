'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/create_account/page.module.css';

export default function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정 필요
    if (email && username && password) {
      router.push('/');
    }
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <div className={styles.role}>
        <div>
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="admin">Admin</option>
            <option value="tester">Tester</option>
            <option value="developer">Developer</option>
            <option value="pl">PL</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
