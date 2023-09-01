import Image from "next/image";
import Link from "next/link";
import { RedirectTask } from "../components/redirect-task";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Image
          src="/hot_air_balloon.png"
          alt="illustration of a hot air balloon"
          fill
          sizes="(max-width: 668px) 100vh, 668px"
          priority
        />
      </div>
      <div className={styles.section}>
        <span className={styles.icon}>🥳</span>
        <div>
          <h1>Hurra!</h1>
          <p>Vi ser fram emot att träffas.</p>
        </div>
        <div className="text md">
          <RedirectTask />
          <p>återgår till startsidan om 5 sekunder</p>
          <p>
            om inget händer{" "}
            <Link className="text md" href="/">
              klicka här
            </Link>{" "}
            för att gå tillbaka
          </p>
        </div>
      </div>
    </div>
  );
}
