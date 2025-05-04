import { connectToDB } from "@/server/connect";
import { getContinuersCount, getFallenCount, getHobbiesCount } from "@/server/service/fallen.service";
import CustomBubble from "../CustomBubble";
import styles from "./style.module.scss";

export default async function DataBubbles() {
  await connectToDB();
  const [fallenCount, hobbiesCount, continuersCount] = await Promise.all([
    getFallenCount(),
    getHobbiesCount(),
    getContinuersCount(),
  ]);

  return (
    <div className={styles.dataBubbles}>
      <CustomBubble className={styles.dataBubble}>
        <p className={styles.dataNumber}>{fallenCount}</p>
        <p className={styles.dataText}>נופלים ונופלות מונצחים</p>
      </CustomBubble>
      <CustomBubble className={styles.dataBubble}>
        <p className={styles.dataNumber}>{hobbiesCount}</p>
        <p className={styles.dataText}>תחביבים מתועדים</p>
      </CustomBubble>
      <CustomBubble className={styles.dataBubble}>
        <p className={styles.dataNumber}>{continuersCount}</p>
        <p className={styles.dataText}>מנציחים ממשיכים בדרכם</p>
      </CustomBubble>
    </div>
  );
}