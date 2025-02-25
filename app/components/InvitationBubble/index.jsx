"use client";

import LargeBubble from "../LargeBubble";
import { useRouter } from "next/navigation";

const InvitationBubble = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/all-fallen", { scroll: false });
  };

  return (
    // change to link componet instead of onClick - better seo - not need use client
    <LargeBubble
      title="הצטרפו להנצחה"
      subtitle="יחד נמשיך את המורשת של יקירינו דרך התחביבים והסיפורים שהשאריו אחריהם"
      buttonText="לעמוד הנופלים"
      onButtonClick={handleClick}
    />
  );
};

export default InvitationBubble;
