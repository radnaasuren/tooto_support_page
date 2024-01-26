"use client";
import ArticleIcon from "@/assets/icons/article";
import { useRouter } from "next/navigation";
import { ReactEventHandler, useEffect, useState } from "react";
import { Box, Button, Text } from ".";
import Image from "next/image";

interface CardProps {
  category: string;
  groups: Array<{
    groupName: string;
    articles: Array<{
      title: string;
      _id: string;
    }>;
  }>;
  onClick?: ReactEventHandler;
  showAll: boolean;
  Icon: {
    url: string;
  };
  categoryId: string;
  key: string;
}
interface ArrayDocType {
  type: string;
  value: string;
  id: string;
}

export const Card = ({
  category,
  groups,
  onClick,
  showAll,
  Icon,
  categoryId,
}: CardProps) => {
  const router = useRouter();

  const [ArrayData, setArrayData] = useState<Array<ArrayDocType>>([]);

  useEffect(() => {
    const docs: Array<ArrayDocType> = [];
    groups.map((group) => {
      docs.push({
        type: "group",
        value: group.groupName,
        id: "",
      });
      group.articles.map(({ title, _id }) => {
        docs.push({
          type: "article",
          value: title,
          id: _id,
        });
      });
    });

    setArrayData(docs);
  }, [groups]);

  return (
    <Box
      className="h-fit w-[360px] flex mb-[30px]"
      onClick={onClick}
      id={categoryId}
    >
      <Box
        className={`bg-[white] h-fit w-full flex-col gap-[20px] p-[30px] text-primary ${showAll == false && "min-h-[340px]"}`}
      >
        <Box className="gap-4 flex items-center">
          <Box className="w-[50px] h-[50px] flex items-center justify-center">
            <Image alt="category" src={Icon?.url} width={50} height={50} />
          </Box>
          <Button onClick={() => router.push(`/category?id=${categoryId}`)}>
            <Text className="font-bold text-xl text-left">{category}</Text>
          </Button>
        </Box>
        <Box className="flex-col w-full gap-[20px]">
          {showAll
            ? ArrayData.map(({ type, value, id }) =>
                type == "group" ? (
                  <Text key={id} className="font-bold text-lg">
                    {value}
                  </Text>
                ) : (
                  <Box
                    key={id}
                    className="flex items-center gap-4 h-fit "
                    onClick={() => router.push(`/doc?id=${id}`)}
                  >
                    <ArticleIcon />
                    <Text className="text-base break-words w-[272px] font-semibold text-primary">
                      {value}
                    </Text>
                  </Box>
                ),
              )
            : ArrayData.slice(0, 4).map(({ type, value, id }) =>
                type == "group" ? (
                  <Text key={id} className="font-bold text-lg">
                    {value}
                  </Text>
                ) : (
                  <Box
                    key={id}
                    className="flex items-center gap-4 h-fit "
                    onClick={() => router.push(`/doc?id=${id}`)}
                  >
                    <ArticleIcon />
                    <Text className="text-base break-words w-[272px] font-semibold text-primary">
                      {value}
                    </Text>
                  </Box>
                ),
              )}
        </Box>
      </Box>
    </Box>
  );
};
