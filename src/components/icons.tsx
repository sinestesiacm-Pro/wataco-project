import Image from 'next/image';

const BeOnTripLogo = ({ className }: { className?: string }) => (
  <Image
    src="https://i.ibb.co/gDH3v1h/logo-be-on-trip.png"
    alt="Be On Trip Logo"
    width={512}
    height={512}
    className={className}
    priority
  />
);

export const Icons = {
  logo: BeOnTripLogo,
};
