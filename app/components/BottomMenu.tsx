import Link from 'next/link';
import styles from './BottomMenu.module.css';

export default function BottomMenu() {
  return (
    <nav className={styles.menu}>
      <Link href="/dashboard" className="menu-item">🏠 Dashboard</Link>
      <Link href="/tasks" className="menu-item">📋 Tasks</Link>
      <Link href="/referrals" className="menu-item">👥 Referrals</Link>
      <Link href="/settings" className="menu-item">⚙️ Settings</Link>
    </nav>
  );
}
