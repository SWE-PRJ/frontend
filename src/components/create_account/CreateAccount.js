"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../app/create_account/page.module.css";
import { registerAPI } from "@/api/LoginAPI";

export default function CreateAccount() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  var [role, setRole] = useState("tester");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!identifier || !password) {
      alert("Please enter identifier or password.");
      return;
    }
    const userIdentifier = localStorage.getItem("useridentifier");
    var adminIdentifier;
    const userrole = localStorage.getItem("role");
    if (userrole == "ROLE_ADMIN") {
      adminIdentifier = userIdentifier;
    }
    if (role == "developer") {
      role = "dev";
    }

    try {
      const response = await registerAPI(
        identifier,
        password,
        role,
        adminIdentifier
      );
      console.log(response);
      setIdentifier("");
      setPassword("");
      setRole("tester");
    } catch (e) {
      if (e.message === "The identifier already exists.") {
        alert(e.message);
        setIdentifier("");
        setPassword("");
        setRole("tester");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleCreateProject = async () => {
    router.push("/create_project");
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>계정 등록</h2>
      <div className={styles.role}>
        <div>
          <label htmlFor="role">Role</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="tester">tester</option>
            <option value="developer">developer</option>
            <option value="pl">PL</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Enter your identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Create account
        </button>
      </form>
      <button className={styles.createProject} onClick={handleCreateProject}>
        + create/ invite project
      </button>
    </div>
  );
}
