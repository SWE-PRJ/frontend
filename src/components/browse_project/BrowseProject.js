'use client';
import styles from '../../app/browse_issue/page.module.css';

const projects = [
  { project: 'project1', members: ['jy','yj'] }
];

export default function BrowseProject() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.projectHeader}>
            <h1>My Project</h1>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>project</th>
              <th>members</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <td>{project.project}</td>
                <td>{project.members}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
