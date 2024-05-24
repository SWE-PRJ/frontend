'use client';
import { useState } from 'react';
import styles from '../../app/create_issue/page.module.css';

export default function CreateIssue() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('major');
  const [comment, setComment] = useState('');

  const handleCreateIssue = () => {
    const newIssue = {
      title,
      description,
      priority,
      comments: [{ user: 'tester', date: new Date().toISOString().split('T')[0], text: comment }]
    };
    localStorage.setItem('issue', JSON.stringify(newIssue));
    alert('Issue created!');
    setTitle('');
    setDescription('');
    setPriority('major');
    setComment('');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>New Issue</h1>
      </div>
      <main className={styles.main}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="blocker">blocker</option>
            <option value="critical">critical</option>
            <option value="major">major (default)</option>
            <option value="minor">minor</option>
            <option value="trivial">trivial</option>
          </select>
          <input
            type="text"
            placeholder="Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleCreateIssue}>+ Issue create</button>
        </div>
      </main>
    </div>
  );
}
