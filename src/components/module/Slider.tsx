"use client";

import { persianToFinglish } from "@/utils/prTOen";
import { useState } from "react";

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

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
                <img
                    src={`/uploads/images/cermony/${enTitle}/${images[currentIndex]}`}
                    alt={`Slide ${currentIndex}`}
                    className="w-full h-full object-cover rounded-xl" 
                    style={{ objectFit: "cover" }} 
                />
                <button onClick={nextSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-primary-red-2 w-8 h-8 flex items-center justify-center pt-1 rounded-full">&#10095;</button>
                <button onClick={prevSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-primary-red-2 w-8 h-8 flex items-center justify-center pt-1 rounded-full">&#10094;</button>
            </div>
            <div className="flex justify-center mt-5">
                {images.map((_: any, index: number) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? "bg-primary-red-2" : "bg-secondary-red-4"}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};

export default Slider;