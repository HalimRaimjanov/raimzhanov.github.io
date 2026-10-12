"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./Gallery.module.scss";
import { gallery } from "@/app/resources/content";

export default function MasonryGrid() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const photos = gallery.images;
  const move = (step: number) => setActive((index) => (index + step + photos.length) % photos.length);

  return (
    <>
      <div className={styles.grid}>
        {photos.map((photo, index) => (
          <button key={photo.src} type="button" className={styles.photo} aria-label={`Open photo: ${photo.alt}`}
            onClick={() => { setActive(index); dialog.current?.showModal(); }}>
            <Image src={photo.src} alt={photo.alt} fill priority={index < 3}
              sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw" />
            <span className={styles.expand} aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      <dialog ref={dialog} className={styles.lightbox} aria-label="Photo viewer"
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        }}>
        <div className={styles.viewer}>
          <button className={styles.close} type="button" aria-label="Close photo viewer" onClick={() => dialog.current?.close()}>×</button>
          <div className={styles.fullPhoto}>
            <Image src={photos[active].src} alt={photos[active].alt} fill sizes="90vw" />
          </div>
          <div className={styles.controls}>
            <button type="button" aria-label="Previous photo" onClick={() => move(-1)}>←</button>
            <span aria-live="polite">{active + 1} / {photos.length}</span>
            <button type="button" aria-label="Next photo" onClick={() => move(1)}>→</button>
          </div>
        </div>
      </dialog>
    </>
  );
}
