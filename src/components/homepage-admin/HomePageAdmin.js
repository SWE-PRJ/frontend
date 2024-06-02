"use client";
import styles from "../../app/homepage-admin/page.module.css";
import { AddOutline } from "react-ionicons";
import { useRouter } from "next/navigation";

export default function HomePageAdmin() {
  const router = useRouter();

  const handleCreateProject = () => {
    router.push("/create_project");
  };

  const handleCreateAccount = () => {
    router.push("/create_account");
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to Issue Management</h1>
      <div className={styles.plus} onClick={handleCreateProject}>
        <br />
        <AddOutline color={"#00000"} height="70px" width="70px" />
        <br />
        <span>Create/ Invite project</span>
      </div>
      <footer className={styles.footer}>
        <span
          className={styles.createAccountButton}
          onClick={handleCreateAccount}
        >
          create an account
        </span>
        <p>
          Our page is made by juyoung Kim, youngkyeong Bae, sangyun Lee,
          haeseung Lee, yejin Choi
        </p>
      </footer>
    </div>
  );
}
