import SearchForm from "./components/SearchForm";
import ImageWithTitle from "./components/ImageWithTitle";
import PopularHobbies from "./components/PopularHobbies";
import InvitationBubble from "./components/InvitationBubble";

const HomePage = () => {
  return (
    <>
      {/* Header image section */}
      <ImageWithTitle
        imageUrl={"/profileImage.webp"}
        title="לכל תחביב יש שם"
        subtitle="פלטפורמה המאפשרת להכיר את התחביבים שהיו חשובים לנופלי ה-7/10 והמלחמה ולהמשיך אותם לזכרם. דרך סיפורים אישיים, תמונות ותחביבים, כל אחד יכול לקחת חלק בהנצחה פעילה."
      />

      {/* Search section */}
      <SearchForm query="" searchTrigger="click" />

      {/* Popular hobbies section */}
      <PopularHobbies containerType="bubble" />

      {/* Invitation bubble section */}
      <InvitationBubble />
    </>
  );
};
export default HomePage;
