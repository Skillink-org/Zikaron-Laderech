"use client";

import { useRouter } from "next/navigation";
import LargeBubble from "../LargeBubble";

const InvitationBubble = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/all-fallen", { scroll: false });
  };

  return (
    <LargeBubble
      title="הצטרפו להנצחה"
      subtitle="יחד נמשיך את המורשת של יקירינו דרך התחביבים והסיפורים שהשאריו אחריהם"
      buttonText="לעמוד הנופלים"
      onButtonClick={handleClick}
    />
  );
};

export default InvitationBubble;
