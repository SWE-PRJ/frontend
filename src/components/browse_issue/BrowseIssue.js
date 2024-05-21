'use client';
import styles from '../../app/browse_issue/[project]/page.module.css';
import { useRouter, useParams } from 'next/navigation';

const issues = {
    project1: [
        { issueID: 'issue1', title: 'issue11111', state: 'new', priority: 'major', description: '이러쿵저러쿵설명11' },
        { issueID: 'issue2', title: 'issue22222', state: 'assigned', priority: 'minor', description: '이러쿵저러쿵설명22' },
    ],
    project2: [
        { issueID: 'issue3', title: 'issue33333', state: 'new', priority: 'major', description: '이러쿵저러쿵설명33' },
        { issueID: 'issue4', title: 'issue44444', state: 'assigned', priority: 'minor', description: '이러쿵저러쿵설명44' },
      ]
    };

export default function BrowseIssue() {
  const router = useRouter();
  const { project } = useParams();
  const projectIssues = issues[project] || [];
  const handleClickIssue = (issueID) => {
    router.push(`/modify_issue/${issueID}`);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.projectHeader}>
            <h1>/{project}</h1>
        </div>
        <label>
          <input type="checkbox" />
          only show issues related with me
        </label>
        <br></br>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>title</th>
              <th>state</th>
              <th>priority</th>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            {projectIssues.map((issue) => (
              <tr key={issue.issueID} onClick={() => handleClickIssue(issue.issueID)} className={styles.row}>
                <td>{issue.title}</td>
                <td>{issue.state}</td>
                <td>{issue.priority}</td>
                <td>{issue.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
