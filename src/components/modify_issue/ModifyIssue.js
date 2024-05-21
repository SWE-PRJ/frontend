'use client';
import { useState, useEffect } from 'react';
import styles from '../../app/modify_issue/page.module.css';

export default function ModifyIssue() {
  const [issue, setIssue] = useState(null);
  const [state, setState] = useState('');
  const [assignee, setAssignee] = useState('');
  const [comments, setComments] = useState([
    { date: '2024/05/16', user: 'tester1', text: '어쩌고저쩌고' },
    { date: '2024/05/17', user: 'dev1', text: '수정했습니다' }
  ]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const storedIssue = JSON.parse(localStorage.getItem('issue'));
    if (storedIssue) {
      setIssue(storedIssue);
    }
  }, []);

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newComments = [...comments, { date: currentDate, user: 'tester1', text: newComment }];
    const updatedIssue = { ...issue, comments: newComments };
    setIssue(updatedIssue);
    setComments(newComments);
    setNewComment('');
    localStorage.setItem('issue', JSON.stringify(updatedIssue));
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.issueDetails}>
          <div className={styles.issueHeader}>
            <div>
              <span>Issue11111</span>
              <span>2024/05/16 tester1</span>
            </div>
            <div>
              <span>Priority: major</span>
              <span>Fixer: dev1</span>
            </div>
          </div>
          <div className={styles.description}>
            <textarea readOnly>이러쿵저러쿵설명11</textarea>
          </div>
          <div className={styles.stateAssignee}>
            <div>
              <label htmlFor="state">State</label>
              <select id="state" value={state} onChange={handleStateChange}>
                <option value="new">new</option>
                <option value="assigned">assigned</option>
                <option value="resolved">resolved</option>
                <option value="closed">closed</option>
                <option value="reopened">reopened</option>
              </select>
            </div>
            <div>
              <label htmlFor="assignee">Assignee</label>
              <select id="assignee" value={assignee} onChange={handleAssigneeChange}>
                <option value="dev1">dev1</option>
                <option value="dev2">dev2</option>
                <option value="dev3">dev3</option>
                <option value="dev4">dev4</option>
                <option value="dev5">dev5</option>
              </select>
            </div>
          </div>
          <div className={styles.comments}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <span>{comment.date} {comment.user}</span>
                <input readOnly value={comment.text} />
              </div>
            ))}
            <div className={styles.addComment}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
          </div>
          <button className={styles.issueModify}>Issue modify</button>
        </div>
      </main>
    </div>
  );
}
