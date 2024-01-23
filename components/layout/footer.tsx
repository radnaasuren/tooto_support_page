"use client";
import MessageIcon from "@/assets/icons/messageIcon";
import { Box, Button, Text } from "..";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const path = usePathname();
  return (
    <Box className="w-full h-[300px] bg-sec justify-center flex mt-auto relative">
      <Box className="xl:w-[1140px] h-fit flex-col xl:flex-row justify-between gap-2.5  items-center xl:mt-[50px] mt-[42px]">
        <Box className="flex-col gap-2.5">
          <Text className="text-lg xl:text-[26px] text-[white] font-semibold leading-5 xl:leading-10">
            Таны асуудлын шийдэл байхгүй байна уу?
          </Text>
          <Text className="opacity-80 text-base text-[white] text-center md:text-left break-normal w-[356px] xl:w-[575px] leading-[22px] xl:leading-8">
            Та хүсэлт гаргаж өөрийн асуудлын шийдлийг нэмүүлэх боломжтой бөгөөд
            санал хүсэлт ч өгөх боломжтой.
          </Text>
        </Box>
        {path !== "/application" ? (
          <Button
            className="w-fit bg-[white] rounded-xl gap-3.5 xl:gap-[18px] px-[20.5px] py-[19px] xl:py-6 xl:px-11 flex items-center"
            onClick={() => router.push("/application")}
          >
            <MessageIcon />
            <Text className="text-sm xl:text-base font-bold text-primary">
              Хүсэлт/Өргөдөл гаргах
            </Text>
          </Button>
        ) : (
          <Box className="h-14" />
        )}
      </Box>
      <Box className="absolute bottom-[33px] gap-1">
        <Text className="text-sec_gray font-bold text-base">Developed by</Text>
        <Text className="text-[white] font-bold text-base">
          Blueprint Solutions
        </Text>
      </Box>
    </Box>
  );
};
export default Footer;
