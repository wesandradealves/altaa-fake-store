'use client';

import Image from 'next/image';
import { memo } from 'react';
import content from '@/config/content.json';

interface Props {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  alt?: string;
}

const Logo = ({
  className,
  width = 140,
  height = 79,
  priority = false,
  sizes,
  alt = content.app.logoAlt,
}: Props) => {
  return (
    <Image
      src="/altaa_logo_branca-1024x576.png"
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
};

export default memo(Logo);
