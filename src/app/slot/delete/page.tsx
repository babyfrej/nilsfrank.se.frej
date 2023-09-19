import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { RedirectTask } from "@/components/redirect-task";

export default async function Page() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Image
          src="/teddy_baking.webp"
          alt="illustration of a teddy bear baking a birthday cake"
          fill
          sizes="(max-width: 668px) 100vw, 668px"
          priority
        />
      </div>
      <div className={styles.section}>
        <span className={styles.icon}>👋</span>
        <div>
          <h1>Tråkigt!</h1>
          <p>Titta förbi en dag vet ja&apos;.</p>
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
