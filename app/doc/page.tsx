"use client";

import { Box, Text } from "@/components";
import { ADD_VISITS } from "@/graphql/ADD_VISITS";
import { GET_ARTICLE } from "@/graphql/GET_ARTICLE";
import { useMutation, useQuery } from "@apollo/client";
import { Commissioner } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const commissioner = Commissioner({ subsets: ["latin"] });

const Page = () => {
  const path = useSearchParams();
  const [content, setContent] = useState("");
  const { loading, data } = useQuery(GET_ARTICLE, {
    variables: {
      id: path.get("id"),
    },
  });
  const [AddVisit] = useMutation(ADD_VISITS);
  useEffect(() => {
    const SentVisit = async () => {
      await AddVisit({
        variables: {
          articleId: path.get("id"),
        },
      });
    };

    SentVisit();
  }, [path, AddVisit]);

  useEffect(() => {
    if (data?.getArticles[0]?.content) {
      setContent(data.getArticles[0].content);
    }
  }, [data]);

  return (
    <Box className="w-full h-fit flex-col py-16 items-center ">
      {loading == true ? (
        <Box className="bg-[white] w-[360px] xl:w-[1140px] h-fit min-h-[700px] xl:px-20 px-[30px] py-6 flex-col gap-5">
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[20%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[70%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[20%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[60%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[65%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[70%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[20%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[60%] h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-full h-[22px] rounded-none" />
          <Box className="animate-pulse bg-skeleton_gray skeleton w-[65%] h-[22px] rounded-none" />
        </Box>
      ) : (
        <Box className="w-[360px] xl:w-[1140px] bg-[white] xl:px-20 px-[30px] py-6 h-fit flex-col">
          <Box className="flex-col w-full gap-3.5">
            <Text className="text-primary font-bold text-xl">
              {data.getArticles[0].title}
            </Text>
            <Text className="text-description font-bold text-base">
              {data.getArticles[0].description}
            </Text>
          </Box>
          <div
            id="DocContainer"
            className={`w-full break-words h-fit min-h-[700px] ${commissioner.className}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Box>
      )}
    </Box>
  );
};
export default Page;
