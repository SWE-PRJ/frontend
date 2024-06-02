"use client";
import { useState, useEffect } from "react";
import styles from "../../app/create_project/page.module.css";
import { CreateProjectAPI } from "@/api/ProjectAPI";
import { inviteUserIntoProjectAPI } from "@/api/MappingAPI";
import { getProjectsAPI } from "@/api/ProjectAPI";
import { fetchUsersAPI } from "@/api/UserAPI";
import { TrashBin } from "react-ionicons";

export default function CreateProject() {
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await getProjectsAPI();
        setProjects(projectsData);

        const usersData = await fetchUsersAPI();
        const filteredUsers = usersData.filter(
          (user) => user.role !== "ROLE_ADMIN"
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddMember = () => {
    if (memberName && !invitedMembers.includes(memberName)) {
      setInvitedMembers((prev) => [...prev, memberName]);
      setMemberName("");
    }
  };

  const handleRemoveMember = (index, event) => {
    event.stopPropagation();
    const updatedMembers = [...invitedMembers];
    updatedMembers.splice(index, 1);
    setInvitedMembers(updatedMembers);
    setSelectedMember(null);
  };

  const handleMemberClick = (member) => {
    setSelectedMember(member === selectedMember ? null : member);
  };

  const handleCreateProject = async () => {
    if (newProjectName) {
      const projectResponse = await CreateProjectAPI(newProjectName);
      const projectId = projectResponse.id;
      alert(`Project "${newProjectName}" created successfully!`);
      setNewProjectName("");
      const updatedProjects = await getProjectsAPI();
      setProjects(updatedProjects);
      setSelectedProjectId(projectId);
    } else {
      alert("Please enter a project name.");
    }
  };

  const handleInviteMembers = async () => {
    if (selectedProjectId) {
      for (const member of invitedMembers) {
        await inviteUserIntoProjectAPI(selectedProjectId, member);
      }
      alert(
        `Members: ${invitedMembers.join(
          ", "
        )} invited to project "${selectedProjectName}".`
      );
      setInvitedMembers([]);
    } else {
      alert("Please select a project.");
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
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <button onClick={handleCreateProject}>+ Create Project</button>
          </div>
        </div>

        <div className={styles.form}>
          <h2>Invite Members to Project</h2>
          <select
            value={selectedProjectId}
            onChange={(e) => {
              setSelectedProjectId(e.target.value);
              const selectedProject = projects.find(
                (project) => project.id === parseInt(e.target.value)
              );
              setSelectedProjectName(
                selectedProject ? selectedProject.name : ""
              );
            }}
          >
            <option value="" disabled>
              Select Project
            </option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <select
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
          >
            <option value="" disabled>
              Select Member
            </option>
            {users.map((user) => (
              <option key={user.id} value={user.identifier}>
                {`${user.identifier} (${user.role})`}
              </option>
            ))}
          </select>
          <div className={styles.buttonContainer}>
            <button onClick={handleAddMember}>Invite member</button>
          </div>
        </div>

        <div>
          <h3>Invited Members</h3>
          <ul>
            {invitedMembers.map((member, index) => (
              <li key={index} onClick={() => handleMemberClick(member)}>
                {member}
                {selectedMember === member && (
                  <TrashBin
                    className={styles.icon}
                    onClick={(e) => handleRemoveMember(index, e)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handleInviteMembers}>Invite to Project</button>
        </div>
      </main>
    </div>
  );
}
