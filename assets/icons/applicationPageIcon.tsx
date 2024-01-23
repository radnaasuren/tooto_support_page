import * as React from "react";
import { SVGProps } from "react";
const ApplicationPageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <g stroke="#fff" strokeLinecap="round" strokeWidth={2}>
      <path d="M2.625 24.803v-2a7 7 0 0 1 7-7h1.75a7 7 0 0 1 7 7v2" />
      <path d="M16.125 18.053v0a5.625 5.625 0 0 1 5.625-5.625v0a5.625 5.625 0 0 1 5.625 5.625v.563" />
      <path
        strokeLinejoin="round"
        d="M10.5 15.803a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM21.75 12.428a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z"
      />
    </g>
  </svg>
);
export default ApplicationPageIcon;
