import Image from "next/image";
import styles from "./YouTubeChannel.module.scss";

export function YouTubeChannel() {
  return (
    <section className={styles.section}>
      <a
        className={styles.card}
        href="https://www.youtube.com/@HalimRaimzhan"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Открыть YouTube-канал Халима Раимжанова в новой вкладке"
      >
        <div className={styles.cover}>
          <Image
            src="/images/youtube/channel-cover.webp"
            alt="Халим Раимжанов на фоне гор"
            width={1600}
            height={900}
            sizes="(max-width: 960px) 100vw, 960px"
            priority
          />
          <span className={styles.badge}>YouTube</span>
          <span className={styles.play} aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </div>
        <div className={styles.details}>
          <h2>О технологиях простыми словами</h2>
          <p>Я веду YouTube-канал, где рассказываю о технологиях, цифровой приватности и безопасности в интернете.</p>
          <span className={styles.action}>Перейти на мой YouTube-канал <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </section>
  );
}
