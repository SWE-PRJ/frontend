"use client";
import styles from "../../app/browse_project/page.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchUserDataAPI } from "@/api/UserAPI";
import { getProjectsAPI, getProjectDetailsAPI } from "@/api/ProjectAPI";

export default function BrowseProject() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUserDataAPI();
        const allProjects = await getProjectsAPI();
        if (userData.role === "ROLE_ADMIN") {
          loadAllProjects(allProjects);
        } else {
          loadProjectDetails(userData.projects, allProjects);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const loadAllProjects = async (allProjects) => {
    const detailedProjects = await Promise.all(
      allProjects.map(async (project) => {
        try {
          const details = await getProjectDetailsAPI(project.id);
          return {
            ...project,
            members: details.userList.map((user) => `${user.identifier}`),
          };
        } catch (error) {
          console.error(
            `Failed to fetch details for project ${project.id}:`,
            error
          );
          return null;
        }
      })
    ).then((results) => results.filter((project) => project !== null));
    setProjects(detailedProjects);
  };

  const loadProjectDetails = async (userProjectIds, allProjects) => {
    const userProjects = allProjects.filter((project) =>
      userProjectIds.includes(project.id)
    );

    const detailedProjects = await Promise.all(
      userProjects.map(async (project) => {
        try {
          const details = await getProjectDetailsAPI(project.id);
          return {
            ...project,
            members: details.userList.map((user) => `${user.identifier}`),
          };
        } catch (error) {
          console.error(
            `Failed to fetch details for project ${project.id}:`,
            error
          );
          return null;
        }
      })
    ).then((results) => results.filter((project) => project !== null));

    console.log("Detailed Projects:", detailedProjects);
    setProjects(detailedProjects);
  };

  const handleClickProject = (projectID) => {
    router.push(`/browse_issue/${projectID}`);
  };

  if (loading) {
    return <div>Loading...</div>;
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
            {projects.length > 0 ? (
              projects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => handleClickProject(project.id)}
                  className={styles.row}
                >
                  <td>{project.name}</td>
                  <td>{project.members.join(", ")}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No project found</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
