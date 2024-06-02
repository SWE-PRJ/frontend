"use client";
import { useState, useEffect } from "react";
import styles from "../../app/create_issue/page.module.css";
import { createIssueAPI } from "@/api/IssueAPI";
import { createCommentAPI } from "@/api/CommentAPI";

export default function CreateIssue() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("major");
  const [comment, setComment] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userID, setUserID] = useState("");
  const [projectID, setProjectID] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    setUserRole(userRole);
  }, []);

  useEffect(() => {
    const userID = localStorage.getItem("id");
    setUserID(userID);
  }, []);

  useEffect(() => {
    const projectID = localStorage.getItem("projectID");
    setProjectID(projectID);
  }, []);

  const handleCreateIssue = async () => {
    if (!title) {
      alert("Please enter an issue title.");
      return;
    }

    try {
      const issueData = await createIssueAPI(
        title,
        description,
        userID,
        priority,
        projectID
      );
      if (comment) {
        await createCommentAPI(issueData.id, comment);
      }
      alert("Issue and comments created successfully.");
      setTitle("");
      setDescription("");
      setPriority("major");
      setComment("");
    } catch (error) {
      console.error("Failed to create issue or comment:", error);
      alert("Failed to create issue!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>New Issue</h1>
      </div>
      <main className={styles.main}>
        <div className={styles.form}>
          <input
            type="text"
            placeholder="Issue Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Issue Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="blocker">blocker</option>
            <option value="critical">critical</option>
            <option value="major">major (default)</option>
            <option value="minor">minor</option>
            <option value="trivial">trivial</option>
          </select>
          <input
            type="text"
            placeholder="Comments"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleCreateIssue}>+ Issue create</button>
        </div>
      </main>
    </div>
  );
}
