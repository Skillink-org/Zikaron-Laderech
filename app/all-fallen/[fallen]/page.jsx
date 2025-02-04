import styles from "./page.module.scss";
import Button from "@/app/components/Button";
import ProfileCard from "@/app/components/ProfileCard";
import HobbyBubble from "@/app/components/HobbyBubble";
import TitleDivider from "@/app/components/TitleDivider";
import HobbyDataBubble from "@/app/components/HobbyDataBubble";
import { getBaseUrl } from "@/lib/baseUrl";
import StatusMessage from "@/app/components/StatusMessage";

export default async function FallenPage({ params }) {
  const fallenId = params.fallen;

  const baseUrl = getBaseUrl();
  const response = await fetch(`${baseUrl}/api/fallen/${fallenId}`);

  if (!response.ok) {
    return <StatusMessage message={response.statusText || 'אירעה שגיאה'} type="error" />;
  }

  const fallenDetails = await response.json();
  const continuedHobbies = fallenDetails.hobbies.filter(
    (hobby) => hobby.continueCount > 0)
  const hobbyContinuersSum = continuedHobbies.reduce((sum, hobby) => sum + hobby.continueCount, 0);

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
          <div className={styles.hobbies}>
            {fallenDetails.hobbies.map((hobby, index) => (
              <HobbyBubble
                key={index}
                children={hobby.name}
                dynamicBackgroundClassName={styles.hobby}
                className={styles.hobbyBubble}
              />
            ))}
          </div>
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
        </div>
        {/* left */}
        <div className={`${styles.leftCol} ${styles.col}`}>
          <div className={styles.hobbiesWithData}>
            {continuedHobbies.map((hobby, index) => (
              <HobbyDataBubble hobbyName={hobby.name} sumMode={false} key={index} fallenName={fallenDetails.firstName} hobbyContinuers={hobby.continueCount} />
            ))}

            <TitleDivider
              title={'סה"כ'}
              containerClassName={styles.totalDivider}
            />
            <HobbyDataBubble sumMode={true} hobbyContinuersSum={hobbyContinuersSum} />
          </div>
          <Button className={styles.button} children={'שיתוף'} />
        </div>
      </div>
    </>
  )
}