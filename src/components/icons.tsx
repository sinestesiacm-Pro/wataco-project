import type { SVGProps } from "react";

const BeOnTripLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
        <g id="paper-plane-icon">
            <path d="M75 10 L 40 70 L 15 65 Z" fill="#FF6A00" />
            <path d="M40 70 L 75 95 L 15 65 Z" fill="#FF6F61" />
            <path d="M75 10 L 110 70 L 135 65 Z" fill="#3DB4F2" />
            <path d="M110 70 L 75 95 L 135 65 Z" fill="#3DBB6F" />
            <path d="M40 70 L 110 70 L 75 95 Z" fill="#1F2C4B" />
        </g>
        <text
            x="75"
            y="130"
            fontFamily="Nunito, sans-serif"
            fontWeight="bold"
            fontSize="18"
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
