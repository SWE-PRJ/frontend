'use client';
import { useState } from 'react';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [memberName, setMemberName] = useState('');
  const [invitedMembers, setInvitedMembers] = useState(['kimju0', 'Yejin22']);

  const handleAddMember = () => {
    if (memberName && !invitedMembers.includes(memberName)) {
      setInvitedMembers([...invitedMembers, memberName]);
      setMemberName('');
    }
  };

  const handleCreateProject = () => {
    if (projectName) {
      alert(`Project "${projectName}" created with members: ${invitedMembers.join(', ')}`);
      setProjectName('');
      setInvitedMembers(['kimju0', 'Yejin22']);
    } else {
      alert('Please enter a project name.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>New Project</h1>
      <br></br>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          style={{ padding: '8px', width: '300px', marginBottom: '10px', display: 'block' }}
        />
        <input
          type="text"
          placeholder="Member name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          style={{ padding: '8px', width: '300px', marginBottom: '10px', display: 'block' }}
        />
        <br></br>
        <button onClick={handleAddMember} style={{ padding: '8px 16px', marginBottom: '20px' }}>
          Invite member
        </button>
        <button onClick={handleCreateProject} style={{ padding: '8px 16px' }}>
          + Project create
        </button>
      </div>
      <div>
        <h3>Invited Members</h3>
        <ul>
          {invitedMembers.map((member, index) => (
            <li key={index}>{member}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
