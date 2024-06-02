"use client";
import { useState, useEffect } from "react";
import styles from "../../app/browse_issue/[project]/page.module.css";
import { useRouter, useParams } from "next/navigation";
import { getProjectIssuesAPI, getUserIssueAPI } from "@/api/IssueAPI";

export default function BrowseIssue() {
  const router = useRouter();
  const { project } = useParams();
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [issues, setIssues] = useState([]);
  const [assignedOnly, setAssignedOnly] = useState(false);
  const userRole = localStorage.getItem("role");
  const userID = localStorage.getItem("useridentifier");

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        let response;
        if (assignedOnly && userRole === "ROLE_DEV") {
          console.log(userID);
          response = await getUserIssueAPI(userID);
          console.log(response);
        } else {
          response = await getProjectIssuesAPI(project);
        }
        setIssues(response.issues || []);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    if (project) {
      fetchIssues();
      localStorage.setItem("projectID", project);
    }
  }, [project, assignedOnly, userID, userRole]);

  const filteredIssues = issues.filter((issue) => {
    const searchLower = search.toLowerCase();
    if (searchType === "all") {
      return (
        issue.title.toLowerCase().includes(search.toLowerCase()) ||
        issue.state.toLowerCase().includes(search.toLowerCase()) ||
        issue.priority.toLowerCase().includes(search.toLowerCase())
      );
    }
    return issue[searchType].toLowerCase().includes(searchLower);
  });

  const handleClickIssue = (issue) => {
    localStorage.setItem("selectedIssue", JSON.stringify(issue));
    router.push(`/modify_issue/${issue.id}`);
  };

  const handleCreateIssue = () => {
    router.push(`/create_issue`);
  };

  const handleAssignedOnlyChange = () => {
    setAssignedOnly(!assignedOnly);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.projectHeader}>
          <h1>/{project}</h1>
        </div>
        <div className={styles.controls}>
          <div className={styles.searchOptions}>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className={styles.searchSelect}
            >
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
            {userRole === "ROLE_DEV" && (
              <label>
                <input
                  type="checkbox"
                  checked={assignedOnly}
                  onChange={handleAssignedOnlyChange}
                />
                Show Assigned Issues Only
              </label>
            )}
          </div>
          <div className={styles.buttonContainer}>
            {(userRole === "ROLE_TESTER" || userRole === "ROLE_ADMIN") && (
              <button
                onClick={handleCreateIssue}
                className={styles.createIssueButton}
              >
                Create New Issue
              </button>
            )}
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
              {filteredIssues.length > 0 ? (
                filteredIssues.map((issue) => (
                  <tr
                    key={issue.id}
                    onClick={() => handleClickIssue(issue)}
                    className={styles.row}
                  >
                    <td>{issue.title}</td>
                    <td>{issue.state}</td>
                    <td>{issue.priority}</td>
                    <td>{issue.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No issues found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
