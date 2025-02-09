import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>404</h2>
      <p>הדף המבוקש לא נמצא</p>
      <Link href="/">נווט בחזרה הביתה</Link>
    </div>
  );
}
