'use client';
import { useFallen } from '@/app/contexts/FallenContext';
import HobbyDataBubble from "@/app/components/HobbyDataBubble";
import TitleDivider from "@/app/components/TitleDivider";
import styles from './style.module.scss'

export default function HobbyDataList({ fallenName }) {
  const { hobbies, totalContinuers } = useFallen();
  const continuedHobbies = hobbies.filter(hobby => hobby.continueCount > 0);

  return (
    <>
      <div className={styles.hobbiesWithData}>
        {continuedHobbies.map((hobby, index) => (
          <HobbyDataBubble
            hobbyName={hobby.name}
            sumMode={false}
            key={index}
            fallenName={fallenName}
            hobbyContinuers={hobby.continueCount}
          />
        ))}
      </div>
      <TitleDivider
        title={'סה"כ'}
      />
      <HobbyDataBubble
        fallenName={fallenName}
        sumMode={true}
        hobbyContinuersSum={totalContinuers}
      />
    </>
  );
}