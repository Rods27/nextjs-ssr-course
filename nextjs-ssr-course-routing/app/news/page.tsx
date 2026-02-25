import Link from "next/link";

export default function NewsPage() {
  return (
    <ul>
      <li>
        <Link href="/news/new-item-1">News Item 1</Link>
      </li>
      <li>
        <Link href="/news/new-item-2">News Item 2</Link>
      </li>
      <li>
        <Link href="/news/new-item-3">News Item 3</Link>
      </li>
    </ul>
  );
}
