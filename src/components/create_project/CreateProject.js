'use client';
import { useState } from 'react';
import styles from '../../app/create_project/page.module.css'; // Ensure the path to your CSS module is correct
import { CreateProjectAPI } from '@/api/ProjectAPI';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [invitedMembers, setInvitedMembers] = useState([]);

  const handleAddMember = () => {
    if (memberName && !invitedMembers.includes(memberName)) {
      setInvitedMembers([...invitedMembers, memberName]);
      // ProjectUserAPI(projectName, memberName)
      setMemberName('');
    }
  };

  const handleCreateProject = async () => {
    if (projectName) {
      CreateProjectAPI(projectName);
      alert(`Project "${projectName}" created with members: ${invitedMembers.join(', ')}`);
      setProjectName('');
      setInvitedMembers([]);
    } else {
      alert('Please enter a project name.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>New Project</h1>
      </div>
      <main className={styles.main}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Member name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <div className={styles.buttonGroup}> {/* Add this wrapper */}
              <button onClick={handleAddMember}>
                Invite member
              </button>
              <button onClick={handleCreateProject}>
                + Create Project
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3>Invited Members</h3>
          <ul>
            {invitedMembers.map((member, index) => (
              <li key={index}>{member}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
