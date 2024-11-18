"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";

/**
 * Navbar Component
 * This component renders the site's header with navigation links.
 * It uses a CSS module for styling and Next.js `Link` for navigation.
 *
 * @returns {JSX.Element} - The rendered Navbar component with navigation links.
 */
export default function Navbar() {
  return (
    <header className={styles.siteHeader}>
      {" "}
      {/* The site header container */}
      <nav className={styles.navbar}>
        {" "}
        {/* The navbar container */}
        <ul className={styles.navbarList}>
          {" "}
          {/* Unordered list for the navbar links */}
          {/* Home link */}
          <li className={styles.navbarItem}>
            <Link href="/" className={styles.navbarLink}>
              Anasayfa
            </Link>
          </li>
          {/* Category News link */}
          <li className={styles.navbarItem}>
            <Link href="/category-news" className={styles.navbarLink}>
              Kategori Haberleri
            </Link>
          </li>
          {/* Source News link */}
          <li className={styles.navbarItem}>
            <Link href="/source-news" className={styles.navbarLink}>
              Kaynak Haberleri
            </Link>
          </li>
          {/* Placeholder for any future navbar items */}
          <li className={styles.navbarItem}>
            {/* Empty list item for potential future content */}
          </li>
        </ul>
      </nav>
    </header>
  );
}
