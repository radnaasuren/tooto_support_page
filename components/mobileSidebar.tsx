import ApplicationPageIcon from "@/assets/icons/applicationPageIcon";
import ArticlePageIcon from "@/assets/icons/articlePageIcon";
import HomeIcon from "@/assets/icons/homeIcon";
import TootoIcon from "@/assets/icons/tootoIcon";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Button, Text } from ".";

interface SideBarType {
  isOpen: boolean;
  onClose: () => void;
}
const MobileSidebar = ({ isOpen, onClose }: SideBarType) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setIsClosed(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && isClosing) {
      const timeoutId = setTimeout(() => {
        setIsClosed(true);
        setIsClosing(false);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, isClosing]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsClosing(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    onClose();
  };

  return (
    <div
      className={`fixed z-40 top-0 right-0 w-full bg-[black] bg-opacity-50 flex items-center justify-center transition-opacity ease-in-out duration-600 ${isOpen ? "h-full" : "h-0"} ${isOpen || isClosed ? "opacity-100" : "opacity-0"} ${isClosed ? "invisible" : ""}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <Box
        className={`fixed w-[calc(100%-259px)] ${isOpen ? "h-full" : "h-0"} left-0`}
        onClick={handleClose}
      />
      <Box
        className={`fixed  z-60 top-0 right-0 h-full w-[259px] flex-col bg-sec transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform ease-in-out duration-300`}
      >
        <Box className="w-full mt-5 justify-center">
          <TootoIcon />
        </Box>
        <Box className="flex-col mt-4">
          <Text className="text-white text-lg text-center font-semibold leading-8">
            Туслах платформ
          </Text>
          <Text className="text-white text-xs text-center break-words leading-4">
            Таны СӨХ-ны үнэнч туслах tooto-г
          </Text>
          <Text className="text-white text-xs text-center break-words leading-4">
            санал болгож байна.
          </Text>
        </Box>
        <Box className="w-full flex-col mt-7">
          <Button
            className={`w-full h-14 flex items-center px-5 gap-4 ${path == "/" && "bg-white bg-opacity-20"}`}
            onClick={() => {
              router.push("/");
              handleClose();
            }}
          >
            <HomeIcon opacity={path == "/" ? 1 : 0.5} />
            <Text
              className={`text-white text-sm font-semibold ${path == "/" ? "opacity-100" : "opacity-50"}`}
            >
              Эхлэл
            </Text>
          </Button>
          <Button
            className={`w-full h-14 flex items-center px-5 gap-4 ${path == "/showAll" && "bg-white bg-opacity-20"}`}
            onClick={() => {
              router.push("/showAll");
              handleClose();
            }}
          >
            <ArticlePageIcon opacity={path == "/showAll" ? 1 : 0.5} />
            <Text
              className={`text-white text-sm font-semibold ${path == "/showAll" ? "opacity-100" : "opacity-50"}`}
            >
              Бүх article үзэх
            </Text>
          </Button>
          <Button
            className={`w-full h-14 flex items-center px-5 gap-4 ${path == "/application" && "bg-white bg-opacity-20"}`}
            onClick={() => {
              router.push("/application");
              handleClose();
            }}
          >
            <ApplicationPageIcon opacity={path == "/application" ? 1 : 0.5} />
            <Text
              className={`text-white text-sm font-semibold ${path == "/application" ? "opacity-100" : "opacity-50"}`}
            >
              Бүртгүүлэх
            </Text>
          </Button>
        </Box>
        <Box className="absolute bottom-4 flex-col w-full justify-center">
          <Text className="text-sec_gray font-bold text-base text-center">
            Developed by
          </Text>
          <Text className="text-[white] font-bold text-base text-center">
            Blueprint Solutions
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default MobileSidebar;
