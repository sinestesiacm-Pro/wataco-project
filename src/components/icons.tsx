import type { SVGProps } from "react";

const BeOnTripLogo = (props: SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 250 250" {...props}>
        <defs>
            <linearGradient id="orange-grad" gradientTransform="rotate(135)">
                <stop offset="0%" stopColor="#F99B26" />
                <stop offset="100%" stopColor="#F2572C" />
            </linearGradient>
            <linearGradient id="blue-grad" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#55D1F6" />
                <stop offset="100%" stopColor="#4A6CF7" />
            </linearGradient>
        </defs>
        <path d="M22.9, 212.4 L204.6,39.3 L73.4,159.2Z" fill="url(#orange-grad)"/>
        <path d="M73.4,159.2 L204.6,39.3 L230,73.8Z" fill="url(#blue-grad)"/>
        <path d="M73.4,159.2 L118.8,202 L204.6,39.3Z" fill="#30C9A5"/>
        <path d="M22.9, 212.4 L73.4,159.2 L118.8,202Z" fill="#303F57"/>
    </svg>
);


export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => <BeOnTripLogo {...props} />,
};
