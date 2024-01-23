"use client";
import ApplicationIllustration from "@/assets/icons/applicationIllustration";
import MailIcon from "@/assets/icons/mailIcon";
import PhoneIcon from "@/assets/icons/phoneIcon";
import PingIcon from "@/assets/icons/ping";
import { Box, Button, Input, Text } from "@/components";
import { CheckBox } from "@/components/checkbox";
import { ADD_FEEDBACK } from "@/graphql/ADD_FEEDBACK";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

interface Credentials {
  [key: string]: string;
}

export default function Page() {
  const [type, setType] = useState("Бүртгүүлэх");
  const [cred, setCred] = useState<Credentials>({
    firstname: "",
    lastname: "",
    mail: "",
    number: "",
    info: "",
  });

  const [err, setErr] = useState(false);
  const [SendFeedback] = useMutation(ADD_FEEDBACK);
  const [windowWidth, setWindowWidth] = useState(0);
  const SendApplication = async () => {
    setErr(true);
    if (Object.keys(cred).every((key) => cred[key] !== "")) {
      await SendFeedback({
        variables: {
          firstName: cred.firstName,
          lastName: cred.lastName,
          email: cred.email,
          number: cred.number,
          type: type,
          desc: cred.info,
        },
      });
    }
  };
  useEffect(() => {
    if (window) {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  return (
    <Box className="w-full h-fit py-16 flex justify-center">
      <Box className="w-[360px] h-[782px] flex-col flex-col-reverse xl:flex-row xl:w-[1140px] xl:h-[667px] bg-[white] rounded-md">
        <Box className="h-[248px] xl:h-full w-full xl:w-[501px] bg-sec rounded-md relative xl:p-10 px-[30px] py-10  flex-col items-start">
          <Text className=" hidden xl:flex text-3xl text-[white]">
            Хүсэлт/Өргөдөл бичих
          </Text>
          <Text className=" hidden xl:flex text-lg mt-3.5 text-[white]">
            Таньд мэдээлэх зүйл байна уу?
          </Text>
          <Box className="flex-col gap-3 xl:gap-[50px] xl:mt-28">
            <Box className="gap-6 flex items-center">
              <PhoneIcon />
              <Text className="text-[white] text-base">+976 87654321</Text>
            </Box>
            <Box className="gap-6 flex items-center">
              <MailIcon />
              <Text className="text-[white] text-base">support@tooto.mn</Text>
            </Box>
            <Box className="gap-6 flex items-center">
              <PingIcon />
              <Text className="text-[white] text-base">
                900, Max tower, 9th Floor
              </Text>
            </Box>
          </Box>
          <Box className="absolute bottom-0 right-0 hidden xl:flex">
            <ApplicationIllustration />
          </Box>
        </Box>
        <Box className="w-full h-full p-[30px] xl:py-12 xl:px-14 gap-2.5 xl:gap-11 flex-col">
          <Box className="w-full gap-2.5 xl:gap-10 flex-col xl:flex-row">
            <Box className="w-full xl:w-[50%] flex-col">
              <Text
                className={`text-xs mb-3.5 ${err == true ? (cred.firstname == "" ? "text-err" : "text-field") : "text-field"}`}
              >
                Нэр
              </Text>
              <Box className="flex-col gap-1">
                <Input
                  placeholder={windowWidth >= 640 ? "Бат-Эрдэнэ" : ""}
                  value={cred.firstname}
                  onChange={(e) =>
                    setCred({ ...cred, firstname: e.target.value })
                  }
                />
                <Box
                  className={`w-full h-[1px] ${err == true ? (cred.firstname == "" ? "bg-err" : "bg-field") : "bg-field"}`}
                />
              </Box>
            </Box>
            <Box className="w-full xl:w-[50%] flex-col">
              <Text
                className={`text-xs mb-3.5 ${err == true ? (cred.lastname == "" ? "text-err" : "text-field") : "text-field"}`}
              >
                Овог
              </Text>
              <Box className="flex-col gap-1">
                <Input
                  placeholder={windowWidth >= 640 ? "Бат" : ""}
                  value={cred.lastname}
                  onChange={(e) =>
                    setCred({ ...cred, lastname: e.target.value })
                  }
                />
                <Box
                  className={`w-full h-[1px] ${err == true ? (cred.lastname == "" ? "bg-err" : "bg-field") : "bg-field"}`}
                />
              </Box>
            </Box>
          </Box>
          <Box className="w-full gap-2.5 xl:gap-10 flex-col xl:flex-row">
            <Box className="w-full xl:w-[50%] flex-col">
              <Text
                className={`text-xs mb-3.5 ${err == true ? (cred.mail == "" ? "text-err" : "text-field") : "text-field"}`}
              >
                Цахим шуудан
              </Text>
              <Box className="flex-col gap-1">
                <Input
                  placeholder={windowWidth >= 640 ? "baterdene@gmail.com" : ""}
                  value={cred.mail}
                  onChange={(e) => setCred({ ...cred, mail: e.target.value })}
                />
                <Box
                  className={`w-full h-[1px] ${err == true ? (cred.mail == "" ? "bg-err" : "bg-field") : "bg-field"}`}
                />
              </Box>
            </Box>
            <Box className="w-full xl:w-[50%] flex-col">
              <Text
                className={`text-xs mb-3.5 ${err == true ? (cred.number == "" ? "text-err" : "text-field") : "text-field"}`}
              >
                Утасны дугаар
              </Text>
              <Box className="flex-col gap-1">
                <Input
                  placeholder={windowWidth >= 640 ? "+97687654321" : ""}
                  value={cred.number}
                  onChange={(e) => setCred({ ...cred, number: e.target.value })}
                />
                <Box
                  className={`w-full h-[1px] ${err == true ? (cred.number == "" ? "bg-err" : "bg-field") : "bg-field"}`}
                />
              </Box>
            </Box>
          </Box>
          <Box className="flex-col gap-3.5">
            <Text className="font-semibold text-primary text-md">
              Алинд нь харьяалагдах вэ?
            </Text>
            <Box className="w-full gap-5 xl:gap-10 grid grid-cols-2 xl:grid-cols-4">
              <CheckBox
                value={"Бүртгүүлэх"}
                selectedValue={type}
                setValue={setType}
              />
              <CheckBox
                value={"Санал хүсэлт"}
                selectedValue={type}
                setValue={setType}
              />
              <CheckBox
                value={"Гомдол"}
                selectedValue={type}
                setValue={setType}
              />
              <CheckBox
                value={"Бусад"}
                selectedValue={type}
                setValue={setType}
              />
            </Box>
          </Box>
          <Box className="w-full flex-col">
            <Text
              className={`text-md font-semibold mb-3.5 ${err == true ? (cred.info == "" ? "text-err" : "text-primary xl:text-field") : "text-primary xl:text-field"}`}
            >
              Дэлгэрэнгүй
            </Text>
            <Box className="flex-col gap-1">
              <Input
                placeholder="Дэлгэрэнгүй мэдээллийг энд оруулна уу..."
                value={cred.info}
                onChange={(e) => setCred({ ...cred, info: e.target.value })}
              />
              <Box
                className={`w-full h-[1px] ${err == true ? (cred.info == "" ? "bg-err" : "bg-field") : "bg-field"}`}
              />
            </Box>
          </Box>
          <Button
            className="bg-sec px-12 w-fit h-fit py-3.5 rounded-md"
            onClick={SendApplication}
          >
            <Text className="text-[white] text-base">Илгээх</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
