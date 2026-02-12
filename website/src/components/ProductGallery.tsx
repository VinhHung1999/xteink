"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  alt: string;
  tag?: string;
}

export default function ProductGallery({ images, alt, tag }: ProductGalleryProps) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="glass-card relative aspect-square overflow-hidden rounded-2xl">
        <Image
          src={images[selected]}
          alt={`${alt} — ảnh ${selected + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-300"
          priority
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAIABADASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAABv/EAB4QAAICAgIDAAAAAAAAAAAAAAECAAMEERIhBTFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAYEQEBAQEBAAAAAAAAAAAAAAABAAIRIf/aAAwDAQACEQMRAD8AoOT4rHx8xqLbi4UEq3qVfcH13JnlsSL//9k="
        />
        {tag && (
          <span className="absolute top-4 left-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-semibold text-[#1A1A1A]">
            {tag}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setSelected(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === selected
                  ? "border-gold opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
