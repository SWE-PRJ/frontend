'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../app/create_account/page.module.css';
import { registerAPI } from '@/api/LoginAPI';

export default function CreateAccount() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  var [role, setRole] = useState('tester');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 수정 필요
    const userIdentifier = localStorage.getItem('useridentifier');
    var adminIdentifier;
    const userrole = localStorage.getItem('role');
    if (userrole == 'ROLE_ADMIN') {
      adminIdentifier = userIdentifier;
    }
    if (role == 'developer') {
      role = 'dev';
    }
    try {
      const response = await registerAPI(username, identifier, password, role, adminIdentifier);
      setIdentifier('');
      setUsername('');
      setPassword('');
      setRole('tester');
    } catch (e) {
      if (e == "Error: 이미 존재하는 아이디") {
        alert("이미 존재하는 아이디입니다.");
        setIdentifier('');
        setUsername('');
        setPassword('');
        setRole('tester');
      }
      else {
        alert("error");
      }
    }
  };

  const handleCreateProject = async () => {
    router.push('/create_project');
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
            <option value="tester">tester</option>
            <option value="developer">developer</option>
            <option value="pl">PL</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
        <button className={styles.createProject} onClick={handleCreateProject}>+ create project</button>
      </form>   
    </div>
  );
}
