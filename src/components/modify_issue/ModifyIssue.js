'use client';
import { useState, useEffect } from 'react';
import styles from '../../app/modify_issue/[issueID]/page.module.css';
import { useRouter, useParams } from 'next/navigation';
import { TrashBin, Pencil, CheckmarkDoneCircle } from 'react-ionicons';

export default function ModifyIssue() {
  const router = useRouter();
  const { issueID } = useParams();  // Ensure this retrieves the correct issue parameter
  const [issue, setIssue] = useState(null);
  const [state, setState] = useState('');
  const [assignee, setAssignee] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);

  useEffect(() => {
    const selectedIssue = JSON.parse(localStorage.getItem('selectedIssue') || '{}');
    console.log(selectedIssue);
    if (selectedIssue) {
      setIssue({
        ...selectedIssue,
        state: selectedIssue.state || '',
        assignee: selectedIssue.assignee || '',
        comments: selectedIssue.comments || [],
      });
      setState(selectedIssue.state || '');
      setAssignee(selectedIssue.assignee || '');
      setComments(selectedIssue.comments || []);
    }
  }, [issueID]);

  const handleDeleteIssue = () => {
    // Implement the API call to delete the issue here if required
    router.push('/browse_project');
  };

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
    setIssue({ ...issue, comments: newComments });
    setComments(newComments);
    setNewComment('');
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditingCommentText(comments[index].text);
  };

  const handleUpdateComment = () => {
    const updatedComments = comments.map((comment, index) => (
      index === editingCommentIndex ? { ...comment, text: editingCommentText } : comment
    ));
    setIssue({ ...issue, comments: updatedComments });
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditingCommentText('');
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setIssue({ ...issue, comments: updatedComments });
    setComments(updatedComments);
  };

  const toggleCommentSelection = (index) => {
    setSelectedCommentIndex(selectedCommentIndex === index ? null : index);
  };

  if (!issue) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.issueDetails}>
          <div className={styles.issueHeader}>
            <div>
              <h1>/{issue.title}</h1>
            </div>
            <div>
              <span>Report: {issue.reporterName} {'('}{formatDate(issue.reportedAt)}{')'}</span>
              <span>Priority: {issue.priority}</span>
              <span>Fixer: {issue.fixerName}</span>
            </div>
          </div>
          <div className={styles.description}>
            <textarea readOnly value={issue.description}></textarea>
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
              <div 
                key={index} 
                className={styles.commentContainer}
                onClick={() => toggleCommentSelection(index)}
              >
                {editingCommentIndex === index ? (
                  <>
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                    <CheckmarkDoneCircle
                      className={`${styles.icon} ${styles.checkIcon}`}
                      onClick={handleUpdateComment}
                    />
                  </>
                ) : (
                  <>
                    <input readOnly className={styles.commentText} value={comment.text} />
                    <span className={styles.commentInfo}>{comment.date} {comment.user}</span>
                    {selectedCommentIndex === index && (
                      <div className={styles.commentIcons}>
                        <Pencil
                          className={styles.icon}
                          onClick={() => handleEditComment(index)}
                        />
                        <TrashBin
                          className={styles.icon}
                          onClick={() => handleDeleteComment(index)}
                        />
                      </div>
                    )}
                  </>
                )}
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
          <button onClick={handleDeleteIssue} className={styles.issueDelete}>Delete Issue</button>
        </div>
      </main>
    </div>
  );
}
