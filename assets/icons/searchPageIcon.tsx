import * as React from "react";
import { SVGProps } from "react";
const SearchPageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <g
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <path d="m20.25 21.053 5.25 5.25M4.5 14.303a9 9 0 1 0 18 0 9 9 0 0 0-18 0Z" />
    </g>
  </svg>
);
export default SearchPageIcon;
