'use client';
import styles from '../../app/homepage-admin/page.module.css';
import { ArrowForwardOutline } from 'react-ionicons'
import { useRouter } from 'next/navigation';

export default function HomePageOther() {
  const router = useRouter();
  const handleBrowseProject = () => {
    router.push('/browse_project');
  }

    return (
        <div className={styles.container}>
            <h1>Welcome to Issue Management</h1>
            <div className={styles.arrow} onClick={handleBrowseProject}>
                    <br />
                    <ArrowForwardOutline color={'#00000'} height="70px" width="70px" />
                    <br />
                    <span>My project</span>
            </div>
            <footer className={styles.footer}>
                <p>Our page is made by juyoung Kim, youngkyuong Bae, sangyoon Lee, heaseung Lee, yejin Choi (스펠링수정)</p>
            </footer>
        </div>
    );
}