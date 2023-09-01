import Image from "next/image";
import { cookies } from "next/headers";
import styles from "./page.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RedirectTask } from "../components/redirect-task";

export default async function Page() {
  const c = cookies().get(process.env.COOKIE_CODE)?.value;

  if (!c) {
    redirect("/");
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Image
          src="/teddy_baking.png"
          alt="illustration of a teddy bear baking a birthday cake"
          fill
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
