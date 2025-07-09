import type { SVGProps } from "react";

const BeOnTripLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 142 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_105_2)">
        <path
          d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
          fill="#007BFF"
        />
        <path
          d="M16.3333 3.55554L8.33329 16.2222L11.5555 17.5555L14.4444 14.6667L21.3333 7.77776L16.3333 3.55554Z"
          fill="white"
        />
        <path
          d="M16.3333 28.4444L8.33329 15.7778L11.5555 14.4444L14.4444 17.3333L21.3333 24.2222L16.3333 28.4444Z"
          fill="white"
        />
        <path
          d="M14.4444 14.6667L8.33329 16.2222L14.4444 17.3333L23.6666 11.7778L14.4444 14.6667Z"
          fill="#FF7F00"
        />
      </g>
      <text
        x="40"
        y="23"
        fontFamily="Poppins, sans-serif"
        fontWeight="600"
        fontSize="20"
        fill="#262626"
      >
        Be On Trip
      </text>
      <defs>
        <clipPath id="clip0_105_2">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
);


export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => <BeOnTripLogo {...props} />,
};
