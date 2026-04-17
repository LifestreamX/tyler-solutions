import Image from 'next/image';

const BRAND_LOGO_SRC = '/brand-logo.png?v=20260417-1';
const BRAND_LOGO_STYLES = {
  container: 'h-12 w-[300px] sm:h-[52px] sm:w-[340px] lg:h-14 lg:w-[380px]',
  sizes: '(min-width: 1024px) 380px, (min-width: 640px) 340px, 300px',
} as const;

type BrandLogoProps = {
  priority?: boolean;
};

export function BrandLogo({ priority = false }: BrandLogoProps) {
  return (
    <div className={`relative ${BRAND_LOGO_STYLES.container}`}>
      <Image
        src={BRAND_LOGO_SRC}
        alt='Tyler Allen logo'
        fill
        sizes={BRAND_LOGO_STYLES.sizes}
        priority={priority}
        unoptimized
        className='object-contain'
      />
    </div>
  );
}
