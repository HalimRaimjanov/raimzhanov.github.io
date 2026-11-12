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
        aria-label="Халим Раимжановдун YouTube каналын жаңы өтмөктө ачуу"
      >
        <div className={styles.cover}>
          <Image
            src="/images/youtube/channel-cover.webp"
            alt="Халим Раимжанов тоолордун алдында"
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
          <h2>Технологиялар тууралуу жөнөкөй тил менен</h2>
          <p>YouTube каналымда технологиялар, санариптик купуялык жана интернеттеги коопсуздук тууралуу айтып берем.</p>
          <span className={styles.action}>Менин YouTube каналыма өтүү <span aria-hidden="true">↗</span></span>
        </div>
      </a>
    </section>
  );
}
