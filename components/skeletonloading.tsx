import SkeletonIcon from "@/assets/icons/skeletonIcon";
import { Box } from ".";

export const SkeletonLoading = () => {
  return (
    <Box className="w-[360px] h-[370px] bg-sec_white p-[30px] gap-5 flex-col ">
      <Box className="w-full h-fit">
        <Box className="animate-pulse rounded-full  skeleton h-[50px] w-[50px]">
          <SkeletonIcon />
        </Box>
      </Box>
      <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
      <Box className="animate-pulse bg-skeleton_gray skeleton w-[70%] h-[22px] rounded-none" />
      <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
      <Box className="animate-pulse bg-skeleton_gray skeleton w-[60%] h-[22px] rounded-none" />
      <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
      <Box className="animate-pulse bg-skeleton_gray skeleton w-[65%] h-[22px] rounded-none" />
    </Box>
  );
};
