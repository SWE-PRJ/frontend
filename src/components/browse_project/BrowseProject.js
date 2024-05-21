'use client';
import styles from '../../app/browse_project/page.module.css';
import { useRouter } from 'next/navigation';

const projects = [
  { projectID: 'project1', project: 'project1', members: ['jy','yj'] }
];

export default function BrowseProject() {
  const router = useRouter();
  const handleClickProject = (projectID) => {
    router.push(`/browse_issue/${projectID}`);
  }
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.projectHeader}>
            <h1>My Project</h1>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>projects</th>
              <th>members</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.projectID} onClick={() => handleClickProject(project.projectID)} className={styles.row}>
                <td>{project.project}</td>
                <td>{project.members.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
