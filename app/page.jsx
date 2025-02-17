import ImageWithTitle from "./components/ImageWithTitle";
import SearchForm from "./components/SearchForm/SearchForm";
import PopularHobbies from "./components/PopularHobbies/PopularHobbies";
import InvitationBubble from "./components/InvitationBubble/InvitationBubble";

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
      {/* TODO: change search from onchange to onclick with search button instead of reset */}
      <SearchForm />

      {/* Popular hobbies section */}
      <PopularHobbies />

      {/* Invitation bubble section */}
      <InvitationBubble />
    </>
  );
};
export default HomePage;
