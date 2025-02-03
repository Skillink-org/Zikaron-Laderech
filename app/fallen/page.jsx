import HobbyBubble from '@/app/components/HobbyBubble'
import HobbyDataBubble from '@/app/components/HobbyDataBubble'
import ProfileCard from '@/app/components/ProfileCard'
import Button from '@/app/components/Button'
import TitleDivider from '@/app/components/TitleDivider'
import styles from './page.module.scss'

export default function FallenPage() {
    const hobbies = ["טניס", "שירה", "ריצה", "אפיה", "סריגה", "שחיה"]
    const hh = ['טניס', 'שירה', 'ריצה']
    const { firstName, lastName, birthYear, deathYear, imageSrc } = {
        firstName: 'מאי',
        lastName: 'הלל',
        birthYear: '2000',
        deathYear: '2023',
        imageSrc: '/profileImage.webp'
    }
    const mainTitle = 'תמשיכו לבנות לגו. זה החלום והתחביב הכי גדול שלי'
    const aboutParagraph = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil reiciendis, rerum tempore officiis molestias ab consequuntur est, doloremque accusamus reprehenderit quod voluptates enim, deleniti ex atque sint quisquam? Debitis, officiis!'
    const additionalParagraph = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, perferendis, sequi dolore quisquam obcaecati molestiae consequuntur minus laboriosam est itaque qui saepe provident, iusto in quod! Consectetur voluptates alias velit?'

    return (
        <>
            <div className={styles.fallen}>
                <div className={`${styles.rightCol} ${styles.col}`} >
                    <ProfileCard firstName={firstName} lastName={lastName} birthYear={birthYear} deathYear={deathYear} imageUrl={imageSrc} />
                    <TitleDivider title={'התחביבים שלי'} />
                    <div className={styles.hobbies}>{hobbies.map((hobby) => (
                        <HobbyBubble key={hobby} children={hobby} className={styles.hobby} />
                    ))}
                    </div>
                </div>
                <div className={`${styles.middleCol} ${styles.col}`}>
                    <h1 className={styles.mainTitle}>{mainTitle}</h1>
                    <div>
                        <TitleDivider title={'התחביבים שלי'} />
                        <p className={styles.paragraph}>{aboutParagraph}</p>
                    </div>
                    <div>
                        <TitleDivider title={'קצת עליי'} />
                        <p className={styles.paragraph}>{additionalParagraph}</p>
                    </div>
                </div>
                <div className={`${styles.leftCol} ${styles.col}`}>
                    <div className={styles.hobbiesWithData}>{hh.map((hobby) => <HobbyDataBubble hobbyName={hobby} sumMode={false} />)}
                    </div>
                        <TitleDivider title={'סה"כ'} />
                    <div>
                        <HobbyDataBubble sumMode={true} />
                    </div>
                    <Button className={styles.button} children={'שיתוף'} />
                </div>
            </div>
        </>
    )
}