import { getFallenById } from "@/server/service/fallen.action";
import { connectToDB } from "@/server/connect";
import { FallenProvider } from '@/app/contexts/FallenContext';
import HobbyDataList from "@/app/components/HobbyDataList";
import HobbyList from "@/app/components/HobbyList";
import ProfileCard from "@/app/components/ProfileCard";
import ShareButton from "@/app/components/ShareButton";
import StatusMessage from "@/app/components/StatusMessage";
import TitleDivider from "@/app/components/TitleDivider";
import styles from "./page.module.scss";

export default async function FallenPage({ params }) {
  await connectToDB();
  // TODO - bonus - use name of fallen instead of id
  const fallenId = (await params).fallen;
  // TODO - use service not action
  const fallen = await getFallenById(fallenId);
  
  // TODO - no need to use response.ok 
  if (!fallen)
    return <StatusMessage message='הנופל לא נמצא' type="error" />;

  return (
    // TODO -  why ? - no need of provider - just pass the data by props
    <FallenProvider initialHobbies={fallen.hobbies}>
      <div className={styles.fallen}>
        {/* right */}
        <div className={`${styles.rightCol} ${styles.col}`}>
          <ProfileCard fallen={fallen} />
          <TitleDivider
            title={"התחביבים שלי"}
            containerClassName={styles.hobbiesDivider}
          />
          <HobbyList hobbies={fallen.hobbies.map((hobby) => hobby.name)} fallenName={fallen.firstName} fallenId={fallenId} />
        </div>
        {/* middle */}
        <div className={`${styles.middleCol} ${styles.col}`}>
          <div className={styles.middleColText}>
            <h1 className={styles.mainTitle}>{fallen.quote}</h1>
            <TitleDivider
              title={"אודות"}
              dividerClassName={styles.sctionsDivider}
            />
            <p className={styles.paragraph}>{fallen.about}</p>
            <TitleDivider
              title={"קצת עליי"}
              dividerClassName={styles.sctionsDivider}
            />
            <p className={styles.paragraph}>{fallen.familyWords}</p>
          </div>
        </div>
        {/* left */}
        <div className={`${styles.leftCol} ${styles.col}`}>
          <HobbyDataList fallenName={fallen.firstName} />
          <ShareButton />
        </div>
      </div>
    </FallenProvider>
  )
}

