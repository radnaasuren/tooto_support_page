import * as React from "react";
import { SVGProps } from "react";
const ArticlePageIcon = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M6 26.303v-22a1 1 0 0 1 1-1h12.63a1 1 0 0 1 .729.316l3.37 3.595a1 1 0 0 1 .271.684v18.405a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1ZM10.5 9.303h9M10.5 21.303h9M10.5 15.303h9" />
    </g>
  </svg>
);
export default ArticlePageIcon;
