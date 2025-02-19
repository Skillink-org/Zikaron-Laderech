import { getFallenById } from "@/server/actions/fallen.action";
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
  const response = await getFallenById(fallenId);
  
  // TODO - no need to use response.ok 
  if (!response.ok)
    return <StatusMessage message={response.message} type="error" />;
  
  // TODO - no need to use response.ok 
  const fallenDetails = response.data;

  return (
    // TODO -  why ? - no need of provider - just pass the data by props
    <FallenProvider initialHobbies={fallenDetails.hobbies}>
      <div className={styles.fallen}>
        {/* right */}
        <div className={`${styles.rightCol} ${styles.col}`}>
          <ProfileCard fallen={fallenDetails} />
          <TitleDivider
            title={"התחביבים שלי"}
            containerClassName={styles.hobbiesDivider}
          />
          <HobbyList styles={styles} hobbies={fallenDetails.hobbies.map((hobby) => hobby.name)} fallenName={fallenDetails.firstName} fallenId={fallenId} />
        </div>
        {/* middle */}
        <div className={`${styles.middleCol} ${styles.col}`}>
          <h1 className={styles.mainTitle}>{fallenDetails.quote}</h1>
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
          <HobbyDataList styles={styles} fallenName={fallenDetails.firstName} />
          <ShareButton styles={styles}/>
        </div>
      </div>
    </FallenProvider>
  )
}

