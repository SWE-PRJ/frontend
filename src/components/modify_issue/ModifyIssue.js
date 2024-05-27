'use client';
import { useState, useEffect } from 'react';
import styles from '../../app/modify_issue/[issueID]/page.module.css';
import { useRouter, useParams } from 'next/navigation';
import { TrashBin, Pencil, CheckmarkDoneCircle } from 'react-ionicons';

const issues = {
  project1: [
    { issueID: 'issue1', title: 'issue11111', state: 'resolved', priority: 'major', description: '이러쿵저러쿵설명11', fixer: 'tester1', assignee: 'dev2' },
    { issueID: 'issue2', title: 'issue22222', state: 'assigned', priority: 'minor', description: '이러쿵저쩌쿵설명22' },
  ],
  project2: [
    { issueID: 'issue3', title: 'issue33333', state: 'new', priority: 'major', description: '이러쿵저러쿵설명33' },
    { issueID: 'issue4', title: 'issue44444', state: 'assigned', priority: 'minor', description: '이러쿵저러쿵설명44' },
  ],
};

export default function ModifyIssue() {
  const router = useRouter();
  const [issue, setIssue] = useState(null);
  const [state, setState] = useState('');
  const [assignee, setAssignee] = useState('');
  const [comments, setComments] = useState([
    { date: '2024/05/16', user: 'tester1', text: '어쩌고저쩌고' },
    { date: '2024/05/17', user: 'dev1', text: '수정했습니다' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState('');
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const { issueID } = useParams();

  useEffect(() => {
    for (const project in issues) {
      const projectIssues = issues[project];
      const foundIssue = projectIssues.find(issue => issue.issueID === issueID);
      if (foundIssue) {
        setIssue(foundIssue);
        setState(foundIssue.state || '');
        setAssignee(foundIssue.assignee || '');
        setComments(foundIssue.comments || []);
        break;
      }
    }
  }, [issueID]);

  const handleDeleteIssue = () => {
    const projectKey = Object.keys(issues).find(key => issues[key].some(i => i.issueID === issueID));
    if (projectKey) {
      const updatedIssues = issues[projectKey].filter(i => i.issueID !== issueID);
      issues[projectKey] = updatedIssues;
      router.push('/browse_project');
    }
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
    const updatedIssue = { ...issue, comments: newComments };
    setIssue(updatedIssue);
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
    const updatedIssue = { ...issue, comments: updatedComments };
    setIssue(updatedIssue);
    setComments(updatedComments);
    setEditingCommentIndex(null);
    setEditingCommentText('');
  };

  const handleDeleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    const updatedIssue = { ...issue, comments: updatedComments };
    setIssue(updatedIssue);
    setComments(updatedComments);
  };

  const toggleCommentSelection = (index) => {
    if (selectedCommentIndex === index) {
      setSelectedCommentIndex(null); // 이미 선택된 코멘트를 다시 클릭하면 선택 해제
    } else {
      setSelectedCommentIndex(index); // 새로운 코멘트 선택
    }
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
              <h1>/{issue.title}</h1>
              <div className={styles.issueHeaderRight}>
                <span>{issue.date} {issue.user}</span>
              </div>
            </div>
            <div>
              <span>Priority: {issue.priority}</span>
              <span>Fixer: {issue.fixer}</span>
            </div>
          </div>
          <div className={styles.description}>
            <textarea readOnly>{issue.description}</textarea>
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
