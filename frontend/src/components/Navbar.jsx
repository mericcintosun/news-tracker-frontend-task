"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">Anasayfa</Link>
          </li>
          <li>
            <Link href="/category-news">Kategori Haberleri</Link>
          </li>
          <li>
            <Link href="/source-news">Kaynak Haberleri</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
