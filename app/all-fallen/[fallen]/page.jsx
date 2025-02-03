import styles from "./page.module.scss";
import Button from "@/app/components/Button";
import ProfileCard from "@/app/components/ProfileCard";
import HobbyBubble from "@/app/components/HobbyBubble";
import TitleDivider from "@/app/components/TitleDivider";
import HobbyDataBubble from "@/app/components/HobbyDataBubble";
import { getBaseUrl } from "@/lib/baseUrl";

export default async function FallenPage({ params }) {
  const fallenId = (await params).fallen;

  const baseUrl = getBaseUrl();
  const fallenDetails = await fetch(`${baseUrl}/api/fallen/${fallenId}`)
    .then((response) => response.json())
    .then((data) => data);

  const continuedHobbies = ["טניס", "שירה", "ריצה"];
  const mainTitle = "תמשיכו לבנות לגו. זה החלום והתחביב הכי גדול שלי";
  const aboutParagraph =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil reiciendis, rerum tempore officiis molestias ab consequuntur est, doloremque accusamus reprehenderit quod voluptates enim, deleniti ex atque sint quisquam? Debitis, officiis!";
  const additionalParagraph =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, perferendis, sequi dolore quisquam obcaecati molestiae consequuntur minus laboriosam est itaque qui saepe provident, iusto in quod! Consectetur voluptates alias velit?";

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
            {fallenDetails.hobbies.map((hobby) => (
              <HobbyBubble
                key={hobby}
                children={hobby}
                dynamicBackgroundClassName={styles.hobby}
                className={styles.hobbyBubble}
              />
            ))}
          </div>
        </div>
        {/* middle */}
        <div className={`${styles.middleCol} ${styles.col}`}>
          <h1 className={styles.mainTitle}>{mainTitle}</h1>

          <TitleDivider
            title={"התחביבים שלי"}
            dividerClassName={styles.sctionsDivider}
          />
          <p className={styles.paragraph}>{aboutParagraph}</p>

          <TitleDivider
            title={"קצת עליי"}
            dividerClassName={styles.sctionsDivider}
          />
          <p className={styles.paragraph}>{additionalParagraph}</p>
        </div>
        {/* left */}
        <div className={`${styles.leftCol} ${styles.col}`}>
          <div className={styles.hobbiesWithData}>
            {continuedHobbies.map((hobby, index) => (
              <HobbyDataBubble hobbyName={hobby} sumMode={false} key={index} />
            ))}

            <TitleDivider
              title={'סה"כ'}
              containerClassName={styles.totalDivider}
            />
            <HobbyDataBubble sumMode={true} />
          </div>
          <Button className={styles.button} children={"שיתוף"} />
        </div>
      </div>
    </>
  );
}
