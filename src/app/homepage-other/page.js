import styles from './page.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1>Welcome to Issue Management</h1>
      <div className={styles.arrow}>
        {/* <span>→</span> */}
        <a href="/myproject">
        <br />
        <img src="/arrow.png" alt="Arrow" style={{width: "50%"}}/>
        <br />
        <span>My project</span>
        </a>
      </div>
      <footer className={styles.footer}>
        <p>Our page is made by juyoung Kim, youngkyuong Bae, sangyoon Lee, heaseung Lee, yejin Choi (스펠링수정)</p>
      </footer>
    </div>
  );
}
