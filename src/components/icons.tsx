import type { SVGProps } from "react";

const BeOnTripLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="orange-gradient" x1="75" y1="10" x2="20" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF9933"/>
          <stop offset="1" stopColor="#FF6A00"/>
        </linearGradient>
        <linearGradient id="blue-gradient" x1="75" y1="10"x2="130" y2="70" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3DB4F2"/>
          <stop offset="1" stopColor="#0099FF"/>
        </linearGradient>
      </defs>
      <g id="paper-plane-icon" transform="translate(0, 5)">
        <path d="M75 10 L 40 70 L 15 65 Z" fill="url(#orange-gradient)" />
        <path d="M40 70 L 75 95 L 15 65 Z" fill="#FF6F61" />
        <path d="M75 10 L 110 70 L 135 65 Z" fill="url(#blue-gradient)" />
        <path d="M110 70 L 75 95 L 135 65 Z" fill="#3DBB6F" />
        <path d="M40 70 L 110 70 L 75 95 Z" fill="#1F2C4B" />
      </g>
      <text
          x="75"
          y="130"
          fontFamily="Nunito, sans-serif"
          fontWeight="bold"
          fontSize="22"
          fill="#1F2C4B"
          textAnchor="middle"
      >
          be on trip
      </text>
    </svg>
);


export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => <BeOnTripLogo {...props} />,
};
