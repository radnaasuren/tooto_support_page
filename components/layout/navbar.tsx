"use client";
import SearchIcon from "@/assets/icons/searchIcon";
import TootoIcon from "@/assets/icons/tootoIcon";
import NavbarIllustration from "@/assets/images/navbarImage.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Input, Text } from "..";
import MenuIcon from "@/assets/icons/menuIcon";
import MobileSidebar from "../mobileSidebar";

const Navbar = () => {
  const router = useRouter();
  const path = usePathname();
  const [value, setValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  const Search = () => {
    if (value !== "") {
      router.push(`/search?search=${value}`);
      return;
    }

    router.push("/");
  };
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      Search();
    }
  };
  useEffect(() => {
    Search();
  }, [value]);
  return (
    <Box>
      <Box
        className={`w-full bg-sec  xl:px-[70px] py-[52px] xl:py-16 flex-col ${path !== "/doc" ? (path !== "/search" ? "xl:h-[557px]" : "h-fit") : "h-fit"} relative items-center`}
      >
        <Box className="flex w-[290px] xl:w-[1140px] justify-between z-10">
          <Button onClick={() => router.push("/")}>
            <TootoIcon />
          </Button>
          {path !== "/application" && (
            <Button
              className="bg-[white] h-fit py-3.5 px-7 rounded-[100px] z-0 hidden xl:flex"
              onClick={() => router.push("/application")}
            >
              <Text className="font-bold text-base text-primary">
                Хүсэлт/Өргөдөл гаргах
              </Text>
            </Button>
          )}
          <Button
            className="w-[42px] h-[42px] xl:hidden z-10"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </Button>
        </Box>
        <Box className="w-[290px] xl:w-[1140px] flex-col">
          <Box className="flex-col mt-4 xl:mt-20">
            <Text className="text-lg xl:text-4xl text-white font-semibold">
              Туслах платформ
            </Text>
            <Text className="text-xs xl:text-base text-white mt-2.5 xl:w-[550px]">
              Та өөрт тулгарч байгаа асуудлаа хайж манай платформын заавар,
              зөвлөгөөг харж болно.
            </Text>
          </Box>
          <Box
            className={`bg-[white] h-[60px] mt-8 flex items-center px-6 gap-5 mt-11 w-[290px] z-10 ${path !== "/doc" ? (path !== "/search" ? "xl:w-[653px]" : "w-full") : "w-full"} `}
          >
            <Button onClick={Search}>
              <SearchIcon />
            </Button>
            <Input
              placeholder="Хайлт хийх"
              className="w-[131px] xl:w-[500px]"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              onKeyDown={handleKeyDown}
            />
          </Box>
        </Box>
        <Box className="absolute bottom-0 right-0 z-0">
          <Image alt="navbarIllustration" src={NavbarIllustration} />
        </Box>
      </Box>
      <MobileSidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
    </Box>
  );
};

export default Navbar;
