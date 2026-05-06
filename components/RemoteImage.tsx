"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

const DEFAULT_FALLBACK = "/fallback-cover.svg";

interface RemoteImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
}

export function RemoteImage({ src, alt, ...props }: RemoteImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      onError={() => setCurrentSrc(DEFAULT_FALLBACK)}
      {...props}
    />
  );
}
