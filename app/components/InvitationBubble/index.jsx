import LargeBubble from "../LargeBubble";
import Link from "next/link";

const InvitationBubble = () => {
  return (
    <Link href="/all-fallen" scroll={false} style={{ textDecoration: 'none' }}>
      <LargeBubble
        title="הצטרפו להנצחה"
        subtitle="יחד נמשיך את המורשת של יקירינו דרך התחביבים והסיפורים שהשאריו אחריהם"
        buttonText="לעמוד הנופלים"
      />
    </Link>
  );
};

export default InvitationBubble;