"use client";
import { useState, useEffect } from "react";
import styles from "../../app/modify_issue/[issueID]/page.module.css";
import { useRouter, useParams } from "next/navigation";
import { TrashBin, Pencil, CheckmarkDoneCircle } from "react-ionicons";
import {
  changeIssueStateAPI,
  getIssueDetailAPI,
  deleteIssueAPI,
} from "@/api/IssueAPI";
import { getProjectDetailsAPI } from "@/api/ProjectAPI";
import { getDetailCommentAPI } from "@/api/RecommendAPI";
import { assignIssueToUserAPI } from "@/api/MappingAPI";
import {
  createCommentAPI,
  deleteCommentAPI,
  updateCommentAPI,
  getCommentsAPI,
} from "@/api/CommentAPI";

export default function ModifyIssue() {
  const router = useRouter();
  const { issueID } = useParams();
  const [issue, setIssue] = useState(null);
  const [state, setState] = useState("");
  const [assignee, setAssignee] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);

  const userIdentifier = localStorage.getItem("useridentifier");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    const projectID = localStorage.getItem("projectID");
    getProjectDetailsAPI(projectID)
      .then((data) => {
        const devs = data.userList.filter((user) => user.role === "ROLE_DEV");
        setDevelopers(devs);
      })
      .catch((error) => {
        console.error("Error fetching developers:", error);
      });
  }, []);

  useEffect(() => {
    if (developers.length > 0 && !assignee) {
      setAssignee(developers[0].identifier);
    }
  }, [developers, assignee]);

  useEffect(() => {
    const fetchIssueDetails = async () => {
      try {
        const issueData = await getIssueDetailAPI(issueID);
        setIssue(issueData);
        setState(issueData.state || "");
        if (issueData.state === "NEW") {
          setAssignee("none");
        } else {
          setAssignee(issueData.assigneeIdentifier || "none");
        }
      } catch (error) {
        console.error("Error fetching issue details:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsData = await getCommentsAPI(issueID);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (issueID) {
      fetchIssueDetails();
      fetchComments();
    }
  }, [issueID]);

  const recommendDeveloper = async () => {
    try {
      const response = await getDetailCommentAPI(issueID);
      if (response) {
        setAssignee(response.userIdentifier);
        alert(`Recommended developer: ${response.userIdentifier}`);
      } else {
        alert("No recommended developer found.");
      }
    } catch (error) {
      console.error("Error recommending developer:", error);
      alert("Failed to recommend a developer.");
    }
  };

  const handleDeleteIssue = async () => {
    const response = await deleteIssueAPI(issueID);
    if (response.onSuccess == true) {
      alert("Issue deleted successfully");
      router.push("/browse_project");
    } else {
      alert("Issue delete failed");
    }
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    if (userRole === "ROLE_PL" || userRole === "ROLE_ADMIN") {
      setAssignee(event.target.value);
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    try {
      const newCommentData = await createCommentAPI(issueID, newComment);
      const newComments = [...comments, newCommentData];
      setComments(newComments);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  const handleEditComment = (index) => {
    setEditingCommentIndex(index);
    setEditingCommentText(comments[index].content);
  };

  const handleUpdateComment = async () => {
    try {
      const comment = comments[editingCommentIndex];
      const updatedComment = await updateCommentAPI(
        issueID,
        comment.id,
        editingCommentText
      );
      const updatedComments = comments.map((comment, index) =>
        index === editingCommentIndex ? updatedComment : comment
      );
      setComments(updatedComments);
      setEditingCommentIndex(null);
      setEditingCommentText("");
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      const comment = comments[index];
      await deleteCommentAPI(issueID, comment.id);
      const updatedComments = comments.filter((_, i) => i !== index);
      setComments(updatedComments);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const toggleCommentSelection = (index) => {
    const comment = comments[index];
    if (comment.commenterIdentifier === userIdentifier) {
      setSelectedCommentIndex(selectedCommentIndex === index ? null : index);
    }
  };

  const handleModifyIssue = async () => {
    try {
      await changeIssueStateAPI(issueID, state);
      if ((userRole === "ROLE_PL" || userRole === "ROLE_ADMIN") && assignee) {
        await assignIssueToUserAPI(issueID, assignee);
      }
      setIssue((prevIssue) => ({
        ...prevIssue,
        state: state,
        assignee: assignee,
      }));
      alert("Issue updated successfully!");
    } catch (error) {
      console.error("Failed to update issue state:", error);
      alert("Failed to update issue state.");
    }
  };

  const issueStates = [
    { value: "FIXED", label: "fixed" },
    { value: "RESOLVED", label: "resolved" },
    { value: "CLOSED", label: "closed" },
    { value: "REOPENED", label: "reopened" },
  ];

  if (issue && (state === "NEW" || state === "ASSIGNED")) {
    issueStates.unshift({ value: state, label: state.toLowerCase() });
  }

  if (!issue) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className={styles.issueDetails}>
          <div className={styles.issueHeader}>
            <div>
              <h1>/{issue.title}</h1>
            </div>
            <div>
              <span>
                Report: {issue.reporterIdentifier} {"("}
                {formatDate(issue.reportedAt)}
                {")"}
              </span>
              <span>Priority: {issue.priority}</span>
              <span>Fixer: {issue.fixerIdentifier || "none"}</span>
            </div>
          </div>
          <div className={styles.description}>
            <textarea readOnly value={issue.description}></textarea>
          </div>
          <div className={styles.stateAssignee}>
            <div>
              <label htmlFor="state">State</label>
              <select id="state" value={state} onChange={handleStateChange}>
                {issueStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="assignee">Assignee</label>
              <select
                id="assignee"
                value={assignee}
                onChange={handleAssigneeChange}
                disabled={userRole !== "ROLE_PL" && userRole !== "ROLE_ADMIN"}
              >
                {(state === "NEW" || !assignee) &&
                  (userRole === "ROLE_PL" || userRole === "ROLE_ADMIN") && (
                    <option value="">none</option>
                  )}
                {state === "NEW" &&
                  (userRole === "ROLE_TESTER" || userRole === "ROLE_DEV") && (
                    <option value="">none</option>
                  )}
                {developers.map((dev) => (
                  <option key={dev.id} value={dev.identifier}>
                    {dev.identifier}
                  </option>
                ))}
              </select>
              {(userRole === "ROLE_PL" || userRole === "ROLE_ADMIN") && (
                <button
                  onClick={recommendDeveloper}
                  className={styles.recommendBtn}
                >
                  Recommend Developer
                </button>
              )}
            </div>
          </div>
          <div className={styles.comments}>
            {comments.map((comment, index) => (
              <div
                key={index}
                className={styles.commentContainer}
                onClick={() => toggleCommentSelection(index)}
              >
                {editingCommentIndex === index ? (
                  <>
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                    />
                    <CheckmarkDoneCircle
                      className={`${styles.icon} ${styles.checkIcon}`}
                      onClick={handleUpdateComment}
                    />
                  </>
                ) : (
                  <>
                    <input
                      readOnly
                      className={styles.commentText}
                      value={comment.content}
                    />
                    <span className={styles.commentInfo}>
                      {formatDate(comment.commentedAt)}{" "}
                      {comment.commenterIdentifier}
                    </span>
                    {selectedCommentIndex === index && (
                      <div className={styles.commentIcons}>
                        <Pencil
                          className={styles.icon}
                          onClick={() => handleEditComment(index)}
                        />
                        <TrashBin
                          className={styles.icon}
                          onClick={() => handleDeleteComment(index)}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            <div className={styles.addComment}>
              <textarea
                value={newComment}
                onChange={handleCommentChange}
                placeholder="Add a comment"
              />
              <button onClick={handleAddComment}>Add Comment</button>
            </div>
          </div>
          <button onClick={handleModifyIssue} className={styles.issueModify}>
            Issue modify
          </button>
          <button onClick={handleDeleteIssue} className={styles.issueDelete}>
            Delete Issue
          </button>
        </div>
      </main>
    </div>
  );
}
