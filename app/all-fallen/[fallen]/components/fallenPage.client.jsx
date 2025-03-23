'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProfileCard from '@/app/components/ProfileCard';
import TitleDivider from '@/app/components/TitleDivider';
import HobbyList from '@/app/all-fallen/[fallen]/components/HobbyList';
import HobbyDataList from '@/app/all-fallen/[fallen]/components/HobbyDataList';
import ShareButton from '@/app/all-fallen/[fallen]/components/ShareButton';
import styles from '../page.module.scss';

export default function FallenPageClient({ fallen }) {
    const { data: session } = useSession();
    const [hobbies, setHobbies] = useState(fallen.hobbies);
    const uniqueContinuers = new Set(
        hobbies
            .map((hobby) => hobby.continuers)
            .flat()
    );
    const [totalContinuers, setTotalContinuers] = useState(uniqueContinuers.size);

    const updateHobby = (hobbyName) => {
        setHobbies(prevHobbies =>
            prevHobbies.map(hobby =>
                hobby.name === hobbyName
                    ? { ...hobby, continueCount: hobby.continueCount + 1 }
                    : hobby
            )
        );
        uniqueContinuers.add(session.user.id)
        setTotalContinuers(uniqueContinuers.size);
    };

    return (
        <div className={styles.fallen}>
            {/* right */}
            <div className={`${styles.rightCol} ${styles.col}`}>
                <ProfileCard fallen={fallen} />
                <TitleDivider
                    titleClassName={styles.title}
                    title={"התחביבים שלי"}
                    containerClassName={styles.hobbiesDivider}
                />
                <HobbyList hobbies={fallen.hobbies} fallenName={fallen.firstName} fallenId={fallen._id} updateHobby={updateHobby} />
            </div>
            {/* middle */}
            <div className={`${styles.middleCol} ${styles.col}`}>
                <div className={styles.middleColText}>
                    <h1 className={styles.mainTitle}>{fallen.quote}</h1>
                    <TitleDivider
                        titleClassName={styles.title}
                        title={"אודות"}
                        dividerClassName={styles.sctionsDivider}
                    />
                    <p className={styles.paragraph}>{fallen.about}</p>
                    <TitleDivider
                        titleClassName={styles.title}
                        title={"קצת עליי"}
                        dividerClassName={styles.sctionsDivider}
                    />
                    <p className={styles.paragraph}>{fallen.familyWords}</p>
                </div>
            </div>
            {/* left */}
            <div className={`${styles.leftCol} ${styles.col}`}>
                <HobbyDataList fallenName={fallen.firstName} hobbies={hobbies} totalContinuers={totalContinuers} />
                <ShareButton />
            </div>
        </div>
    )
}