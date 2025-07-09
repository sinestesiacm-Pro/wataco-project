import Image from 'next/image';

const BeOnTripLogo = ({ width, height, className }: { width: number; height: number; className?: string }) => (
  <Image
    src="https://i.ibb.co/8DdwvnW6/Chat-GPT-Image-9-lug-2025-14-16-37.png"
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
