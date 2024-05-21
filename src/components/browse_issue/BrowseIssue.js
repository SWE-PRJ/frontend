'use client';
import styles from '../../app/browse_issue/page.module.css';

const issues = [
  { title: 'issue11111', state: 'new', priority: 'major', description: '이러쿵저러쿵설명11' },
  { title: 'issue22222', state: 'assigned', priority: 'minor', description: '이러쿵저러쿵설명22' },
];

export default function BrowseIssue() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.projectHeader}>
            <h1>/Project1</h1>
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
            {issues.map((issue, index) => (
              <tr key={index}>
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
