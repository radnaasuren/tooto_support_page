import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={31}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="m25 10.303-7.5-6.575a3.75 3.75 0 0 0-5 0L5 10.303a3.75 3.75 0 0 0-1.25 2.825v10.925a3.75 3.75 0 0 0 3.75 3.75h15a3.75 3.75 0 0 0 3.75-3.75V13.115A3.749 3.749 0 0 0 25 10.303Zm-7.5 15h-5v-6.25a1.25 1.25 0 0 1 1.25-1.25h2.5a1.25 1.25 0 0 1 1.25 1.25v6.25Zm6.25-1.25a1.25 1.25 0 0 1-1.25 1.25H20v-6.25a3.75 3.75 0 0 0-3.75-3.75h-2.5a3.75 3.75 0 0 0-3.75 3.75v6.25H7.5a1.25 1.25 0 0 1-1.25-1.25V13.115a1.25 1.25 0 0 1 .425-.937l7.5-6.563a1.25 1.25 0 0 1 1.65 0l7.5 6.563a1.25 1.25 0 0 1 .425.937v10.938Z"
    />
  </svg>
);
export default SvgComponent;
