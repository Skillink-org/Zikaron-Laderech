import SearchForm from "./components/SearchForm";
import ImageWithTitle from "./components/ImageWithTitle";
import PopularHobbies from "./components/PopularHobbies";
import InvitationBubble from "./components/InvitationBubble";
import TitleDivider from "./components/TitleDivider";
import { Suspense } from "react";

// Need to add Skeleton component
import PopularHobbiesSkeleton from "./components/Skeletons/PopularHobbiesSkeleton"; // You may need to create this component

const HomePage = () => {
  return (
    <>
      {/* Header image section */}
      <ImageWithTitle
        imageUrl={"/HomePageHero.webp"}
        title="לכל תחביב יש שם"
        subtitle="פלטפורמה המאפשרת להכיר את התחביבים שהיו חשובים לנופלי ה-7/10 והמלחמה ולהמשיך אותם לזכרם. דרך סיפורים אישיים, תמונות ותחביבים, כל אחד יכול לקחת חלק בהנצחה פעילה."
      />

      {/* Search section */}
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchForm query="" searchTrigger="click" />
      </Suspense>
      <TitleDivider variant="line"/>
      {/* Popular hobbies section */}
      <Suspense fallback={<PopularHobbiesSkeleton containerType="bubble" />}>
      <PopularHobbies displayMode="home" isClickable={false} />
      </Suspense>
      <TitleDivider />

      {/* Invitation bubble section */}
      <InvitationBubble />
    </>
  );
};
export default HomePage;