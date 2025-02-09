import styles from "./page.module.scss";
import Button from "@/app/components/Button";
import { connectToDB } from "@/server/connect";
import ProfileCard from "@/app/components/ProfileCard";
import TitleDivider from "@/app/components/TitleDivider";
import HobbyDataBubble from "@/app/components/HobbyDataBubble";
import { getFallenById } from "@/server/actions/fallen.action";
import StatusMessage from "@/app/components/StatusMessage";
import HobbiesList from "@/app/all-fallen/[fallen]/HobbiesList";

export default async function FallenPage({ params }) {

  await connectToDB();
  const fallenId = (await params).fallen;
  const response = await getFallenById(fallenId);

  if (!response.ok)
    return <StatusMessage message={response.message} type="error" />;

  const fallenDetails = response.data;
  const continuedHobbies = fallenDetails.hobbies.filter(
    (hobby) => hobby.continueCount > 0
  );
  const hobbyContinuersSum = continuedHobbies.reduce(
    (sum, hobby) => sum + hobby.continueCount,
    0
  );

  return (
    <>
      <div className={styles.fallen}>
        {/* right */}
        <div className={`${styles.rightCol} ${styles.col}`}>
          <ProfileCard fallen={fallenDetails} />
          <TitleDivider
            title={"התחביבים שלי"}
            containerClassName={styles.hobbiesDivider}
          />
          <HobbiesList hobbies={fallenDetails.hobbies.map((hobby) => hobby.name)} fallenName={fallenDetails.firstName} fallenId={fallenId} />
        </div>
        {/* middle */}
        <div className={`${styles.middleCol} ${styles.col}`}>
          <h1 className={styles.mainTitle}>{fallenDetails.familyWords}</h1>

          <TitleDivider
            title={"אודות"}
            dividerClassName={styles.sctionsDivider}
          />
          <p className={styles.paragraph}>{fallenDetails.about}</p>

          <TitleDivider
            title={"קצת עליי"}
            dividerClassName={styles.sctionsDivider}
          />
          <p className={styles.paragraph}>{fallenDetails.familyWords}</p>
        
          <TitleDivider
            title={"ציטוט"}
            dividerClassName={styles.sctionsDivider}
          />
          <p className={styles.paragraph}>{fallenDetails.quote}</p>
        </div>
        {/* left */}
        <div className={`${styles.leftCol} ${styles.col}`}>
          <div className={styles.hobbiesWithData}>
            {continuedHobbies.map((hobby, index) => (
              <HobbyDataBubble
                hobbyName={hobby.name}
                sumMode={false}
                key={index}
                fallenName={fallenDetails.firstName}
                hobbyContinuers={hobby.continueCount}
              />
            ))}

            <TitleDivider
              title={'סה"כ'}
              containerClassName={styles.totalDivider}
            />
            <HobbyDataBubble
              fallenName={fallenDetails.firstName}
              sumMode={true}
              hobbyContinuersSum={hobbyContinuersSum}
            />
          </div>
          <Button className={styles.button} children={"שיתוף"} />
        </div>
      </div>
    </>
  );
}
