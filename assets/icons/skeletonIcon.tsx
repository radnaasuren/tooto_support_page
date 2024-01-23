import * as React from "react";
const SkeletonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} fill="none">
    <rect width={50} height={50} fill="#EEE" rx={25} />
    <g
      stroke="#D8D8D8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <path d="M31.666 16.666H18.334c-.92 0-1.666.747-1.666 1.667v3.334c0 .92.746 1.666 1.666 1.666h13.334c.92 0 1.666-.746 1.666-1.666v-3.334c0-.92-.746-1.666-1.666-1.666ZM31.666 26.666H18.334c-.92 0-1.666.747-1.666 1.667v3.334c0 .92.746 1.666 1.666 1.666h13.334c.92 0 1.666-.746 1.666-1.666v-3.334c0-.92-.746-1.666-1.666-1.666ZM20 20h.008M20 30h.008" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M15 15h20v20H15z" />
      </clipPath>
    </defs>
  </svg>
);
export default SkeletonIcon;
