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
        aria-label="Visit Khalim Raimzhanov's YouTube channel (opens in a new tab)"
      >
        <div className={styles.cover}>
          <Image
            src="/images/youtube/channel-cover.webp"
            alt="Khalim Raimzhanov overlooking a mountain landscape"
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
          <h2>Technology education</h2>
          <p>I also run a YouTube channel, explaining technology, digital privacy and online security.</p>
          <span className={styles.action}>Visit my YouTube channel <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </section>
  );
}
