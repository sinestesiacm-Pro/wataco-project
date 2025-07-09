import type { SVGProps } from 'react';

const BeOnTripLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 152 58" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g clipPath="url(#clip0_102_2)">
      <path d="M47.25 1.25L0.75 22.25L47.25 29.25L62.75 1.25H47.25Z" fill="url(#paint0_linear_102_2)" />
      <path d="M47.25 29.25L0.75 22.25L47.25 43.25V29.25Z" fill="#1F2C4B" />
      <path d="M47.25 1.25L103.5 22.25L47.25 29.25V1.25Z" fill="url(#paint1_linear_102_2)" />
      <path d="M47.25 29.25L103.5 22.25L69.75 42.5L47.25 43.25V29.25Z" fill="#3DBB6F" />
    </g>
    <text
      fill="#1F2C4B"
      xmlSpace="preserve"
      style={{ whiteSpace: 'pre' }}
      fontFamily="Nunito, sans-serif"
      fontSize="16"
      fontWeight="bold"
      letterSpacing="0em"
    >
      <tspan x="0" y="54.5">be on trip</tspan>
    </text>
    <defs>
      <linearGradient
        id="paint0_linear_102_2"
        x1="47.25"
        y1="1.25"
        x2="15.25"
        y2="29.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC83A" />
        <stop offset="1" stopColor="#FF6A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_102_2"
        x1="47.25"
        y1="1.25"
        x2="85.25"
        y2="29.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3DB4F2" />
        <stop offset="1" stopColor="#1E5DFF" />
      </linearGradient>
      <clipPath id="clip0_102_2">
        <rect width="102.75" height="42" fill="white" transform="translate(0.75 1.25)" />
      </clipPath>
    </defs>
  </svg>
);

const BeOnTripIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 104 44" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
     <g clipPath="url(#clip0_102_2_icon)">
      <path d="M47.25 1.25L0.75 22.25L47.25 29.25L62.75 1.25H47.25Z" fill="url(#paint0_linear_102_2_icon)" />
      <path d="M47.25 29.25L0.75 22.25L47.25 43.25V29.25Z" fill="#1F2C4B" />
      <path d="M47.25 1.25L103.5 22.25L47.25 29.25V1.25Z" fill="url(#paint1_linear_102_2_icon)" />
      <path d="M47.25 29.25L103.5 22.25L69.75 42.5L47.25 43.25V29.25Z" fill="#3DBB6F" />
    </g>
     <defs>
      <linearGradient
        id="paint0_linear_102_2_icon"
        x1="47.25"
        y1="1.25"
        x2="15.25"
        y2="29.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFC83A" />
        <stop offset="1" stopColor="#FF6A00" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_102_2_icon"
        x1="47.25"
        y1="1.25"
        x2="85.25"
        y2="29.25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3DB4F2" />
        <stop offset="1" stopColor="#1E5DFF" />
      </linearGradient>
      <clipPath id="clip0_102_2_icon">
        <rect width="102.75" height="42" fill="white" transform="translate(0.75 1.25)" />
      </clipPath>
    </defs>
  </svg>
);


export const Icons = {
  logo: BeOnTripLogo,
  icon: BeOnTripIcon,
};
