'use client';
import { useState } from 'react';
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
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('all');
  const projectIssues = issues[project] || [];

  const filteredIssues = projectIssues.filter(issue => {
    if (searchType === 'all') {
      return issue.title.toLowerCase().includes(search.toLowerCase()) ||
             issue.state.toLowerCase().includes(search.toLowerCase()) ||
             issue.priority.toLowerCase().includes(search.toLowerCase());
    }
    return issue[searchType].toLowerCase().includes(search.toLowerCase());
  });

  const handleClickIssue = (issueID) => {
    router.push(`/modify_issue/${issueID}`);
  };

  const handleCreateIssue = () => {
    router.push(`/create_issue`);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.projectHeader}>
          <h1>/{project}</h1>
        </div>
        <div className={styles.controls}>
          <div className={styles.searchOptions}>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value)} className={styles.searchSelect}>
              <option value="all">All</option>
              <option value="title">Title</option>
              <option value="state">State</option>
              <option value="priority">Priority</option>
            </select>
            <input
              type="text"
              placeholder="Enter search term"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button onClick={handleCreateIssue} className={styles.createIssueButton}>
              Create New Issue
            </button>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>State</th>
                <th>Priority</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.map(issue => (
                <tr key={issue.issueID} onClick={() => handleClickIssue(issue.issueID)} className={styles.row}>
                  <td>{issue.title}</td>
                  <td>{issue.state}</td>
                  <td>{issue.priority}</td>
                  <td>{issue.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
