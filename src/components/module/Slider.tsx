"use client";

import { persianToFinglish } from "@/utils/prTOen";
import { englishToPersianNumber } from "@/utils/englishToPersianNumber";
import { useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Slider = ({ images, title }: any) => {
    const enTitle = persianToFinglish(title)
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase();

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (!images?.length) return null;

    return (
        <div
            className="relative w-full"
            role="region"
            aria-roledescription="carousel"
            aria-label={`تصاویر ${title}`}
            tabIndex={0}
            onKeyDown={(e) => {
                // RTL: the left arrow moves forward, the right arrow moves back.
                if (e.key === "ArrowLeft") nextSlide();
                if (e.key === "ArrowRight") prevSlide();
            }}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2 sm:aspect-[16/10]">
                <img
                    src={`/uploads/images/cermony/${enTitle}/${images[currentIndex]}`}
                    alt={`${title} — تصویر ${englishToPersianNumber(String(currentIndex + 1))} از ${englishToPersianNumber(String(images.length))}`}
                    className="h-full w-full object-cover text-[0px]"
                />
                {images.length > 1 ? <>
                    <button type="button" onClick={prevSlide} aria-label="تصویر قبلی" className="absolute top-1/2 start-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-2xl text-ink shadow-[var(--shadow-soft)] transition-colors hover:bg-surface"><MdChevronRight aria-hidden /></button>
                    <button type="button" onClick={nextSlide} aria-label="تصویر بعدی" className="absolute top-1/2 end-3 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-surface/90 text-2xl text-ink shadow-[var(--shadow-soft)] transition-colors hover:bg-surface"><MdChevronLeft aria-hidden /></button>
                    <span className="absolute bottom-3 start-3 rounded-full bg-night/70 px-3 py-0.5 text-xs font-semibold text-night-ink nums">
                        {englishToPersianNumber(String(currentIndex + 1))} / {englishToPersianNumber(String(images.length))}
                    </span>
                </> : null}
            </div>
            {images.length > 1 ? (
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                    {images.map((_: any, index: number) => (
                        <button
                            type="button"
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`نمایش تصویر ${englishToPersianNumber(String(index + 1))}`}
                            aria-current={currentIndex === index ? "true" : undefined}
                            className="grid h-6 w-6 place-items-center"
                        >
                            <span className={`block h-2 rounded-full transition-all ${currentIndex === index ? "w-5 bg-accent" : "w-2 bg-line-strong"}`} />
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Slider;
