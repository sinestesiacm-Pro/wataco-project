import Image from 'next/image';

const BeOnTripLogo = ({ width, height, className }: { width: number; height: number; className?: string }) => (
  <Image
    src="https://i.ibb.co/VvW0v7Y/logo-with-text.png"
    alt="Be On Trip Logo"
    width={width}
    height={height}
    className={className}
    priority
  />
);

export const Icons = {
  logo: BeOnTripLogo,
  icon: BeOnTripLogo,
};
