'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/login/page.module.css';
import { loginAPI } from '@/api/LoginAPI';

export default function Login() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 인증 로직
    const response = await loginAPI(identifier, password);
    // console.log(response);
    if (response == false || response.status == 500) {
      alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
    }
    else if (response.status == 200 && response.data.id == 4) {
      console.log(response.status);
      router.push('/homepage-admin');
    }
    else {
      router.push('/homepage-other');
    } // role 추가되면 아래거로
    // else if (response.status == 200) {
    //   const role = localStorage.getItem('role');
    //   if (role === 'admin') {
    //     router.push('/homepage-admin');
    //   } else {
    //     router.push('/homepage-other');
    //   }
    // }
  };

  return (
    <div className={styles.container}>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
    </div>
  );
}
