'use client';
import styles from './page.module.css';
import { AddOutline } from 'react-ionicons'

export default function HomePage() {
    return (
        <div className={styles.container}>
            <h1>Welcome to Issue Management</h1>
            <div className={styles.arrow}>
                <a href="/create_project">
                    <br />
                    <AddOutline color={'#00000'} height="50px" width="50px" />
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