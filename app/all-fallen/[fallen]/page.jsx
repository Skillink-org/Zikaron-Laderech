import HobbyBubble from "@/app/components/HobbyBubble";
import HobbyDataBubble from "@/app/components/HobbyDataBubble";
import ProfileCard from "@/app/components/ProfileCard";
import Button from "@/app/components/Button";
import TitleDivider from "@/app/components/TitleDivider";
import styles from "./page.module.scss";
import StatusMessage from "@/app/components/StatusMessage";

export default async function FallenPage({ params }) {
  const fallenId = (await params).fallen;

  // TODO: Generlize base URL depending on the environment
  const response = await fetch(`http://localhost:3000/api/fallen/${fallenId}`);

  if (response.status != 200) {
    return <StatusMessage message={response.statusText || 'An error occurred'} type="error" />;
  }

  const fallenDetails = await response.json();

  return (
    <>
      <div className={styles.fallen}>
        <div className={`${styles.rightCol} ${styles.col}`} >
          <ProfileCard fallen={fallenDetails} />
          <div>
            <TitleDivider title={'התחביבים שלי'} />
            <div className={styles.hobbies}>{fallenDetails.hobbies.map((hobby) => (
              <HobbyBubble key={hobby.name} children={hobby.name} className={styles.hobby} />
            ))}
            </div>
          </div>
        </div>
        <div className={`${styles.middleCol} ${styles.col}`}>
          <h1 className={styles.mainTitle}>{fallenDetails.familyWords}</h1>
          <div>
            <TitleDivider title={'אודות'} />
            <p className={styles.paragraph}>{fallenDetails.about}</p>
          </div>
          <div>
            <TitleDivider title={'קצת עליי'} />
            <p className={styles.paragraph}>{fallenDetails.familyWords}</p>
          </div>
        </div>
        <div className={`${styles.leftCol} ${styles.col}`}>
          <div>
            <div className={styles.hobbiesWithData}>{fallenDetails.hobbies.map((hobby) => <HobbyDataBubble key={hobby.name} hobbyName={hobby.name} sumMode={false} fallenName={fallenDetails.firstName} />)}</div>
            <div>
              <TitleDivider title={'סה"כ'} />
              <HobbyDataBubble sumMode={true} fallenName={fallenDetails.firstName} />
            </div>
          </div>
          <Button className={styles.button} children={'שיתוף'} />
        </div>
      </div>
    </>
  )
}

//     <>
//       <div className={styles.fallen}>
//         <div className={`${styles.rightCol} ${styles.col}`}>
//           <ProfileCard fallen={fallenDetails} />
//           <div>
//             <TitleDivider title={"התחביבים שלי"} />
//             <div className={styles.hobbies}>
//               {hobbies.map((hobby) => (
//                 <HobbyBubble
//                   key={hobby}
//                   children={hobby}
//                   className={styles.hobby}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.middleCol} ${styles.col}`}>
//           <h1 className={styles.mainTitle}>{mainTitle}</h1>
//           <div>
//             <TitleDivider title={"התחביבים שלי"} />
//             <p className={styles.paragraph}>{aboutParagraph}</p>
//           </div>
//           <div>
//             <TitleDivider title={"קצת עליי"} />
//             <p className={styles.paragraph}>{additionalParagraph}</p>
//           </div>
//         </div>
//         <div className={`${styles.leftCol} ${styles.col}`}>
//           <div>
//             <div className={styles.hobbiesWithData}>
//               {hh.map((hobby, index) => (
//                 <HobbyDataBubble
//                   hobbyName={hobby}
//                   sumMode={false}
//                   key={index}
//                 />
//               ))}
//             </div>
//             <div>
//               <TitleDivider title={'סה"כ'} />
//               <HobbyDataBubble sumMode={true} />
//             </div>
//           </div>
//           <Button className={styles.button} children={"שיתוף"} />
//         </div>
//       </div>
//     </>
//   );
// }
