"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";
export default function Navbar() {
  return (
    <header className={styles.siteHeader}>
      {" "}
      <nav className={styles.navbar}>
        {" "}
        <ul className={styles.navbarList}>
          {" "}
          <li className={styles.navbarItem}>
            {" "}
            <Link href="/" className={styles.navbarLink}>
              {" "}
              Anasayfa
            </Link>
          </li>
          <li className={styles.navbarItem}>
            {" "}
            <Link href="/category-news" className={styles.navbarLink}>
              {" "}
              Kategori Haberleri
            </Link>
          </li>
          <li className={styles.navbarItem}>
            {" "}
            <Link href="/source-news" className={styles.navbarLink}>
              {" "}
              Kaynak Haberleri
            </Link>
          </li>
          <li className={styles.navbarItem}>
            {" "}
          </li>
        </ul>
      </nav>
    </header>
  );
}
