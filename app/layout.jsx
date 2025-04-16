import "./globals.scss";
import { auth } from "@/auth";
import Footer from "./components/Footer";
import Header from "./components/Header";
import styles from "./layout.module.scss";
import SessionProvider from "./components/providers/SessionProvider";

export const metadata = {
  title: {
    template: "זכרון לדרך | %s",
    default: "זכרון לדרך",
  },
  description:
    "אתר לזכר הנופלים בפיגוע הטרור של 7 באוקטובר 2023. כאן תוכלו למצוא מידע על הנופלים, ללמוד על התחביבים שלהם ולהצטרף להנצחתם.",
  keywords: [
    "October 7th",
    "Hobbies",
    "Iron Swords",
    "Heroes",
    "Fallen",
    "Remembrance",
    "7 באוקטובר",
    "תחביבים",
    "חרבות ברזל",
    "גיבורים",
    "נופלים",
    "הנצחה",
  ],
  publisher: "Skillink",
  applicationName: "זכרון לדרך",
};

export default async function RootLayout({ children }) {
  // TODO - YOSEF: remove this i think - check documentation
  // https://authjs.dev/getting-started/session-management/get-session?framework=next-js-client
  const session = await auth();

  return (
    <html lang="he">
      <body>
        <SessionProvider session={session}>
          <Header />
          <main className={styles.mainContainer}>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
