"use client";
import { Box, Button, Text } from "@/components";
import { Card } from "@/components/card";
import { SkeletonLoading } from "@/components/skeletonloading";
import { GET_CATEGORIES_QUERY } from "@/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

interface ArticleType {
  description: string;
  title: string;
  _id: string;
}
interface GroupType {
  groupName: string;
  articles: ArticleType[];
}
interface CategoryType {
  group: GroupType[];
  _id: string;
  name: string;
  icon: {
    url: string;
  };
}

export default function Home() {
  const { data, loading } = useQuery(GET_CATEGORIES_QUERY);
  const router = useRouter();

  return (
    <Box className="w-full h-fit flex-col py-16 gap-16 no-scrollbar items-center">
      <Box className="w-fit xl:w-[1140px] h-fit flex gap-[30px] grid xl:grid-cols-3">
        {loading == false
          ? data?.getCategoryAndGroupsInfo?.map(
              ({ name, group, _id, icon }: CategoryType) => (
                <Card
                  key={_id}
                  Icon={icon}
                  category={name}
                  groups={group}
                  showAll={false}
                  categoryId={_id}
                />
              ),
            )
          : Array(6)
              .fill("")
              .map((val, index) => <SkeletonLoading key={index} />)}
      </Box>
      <Box className="w-full h-fit flex items-center">
        <Box className="w-[calc(calc(100vw-235px)/2)] h-0.5 bg-gray" />
        <Button
          className="bg-[white] rounded-xl py-2 px-14"
          onClick={() => router.push("/showAll")}
        >
          <Text className="text-sec font-semibold">Бүгдийг нь үзэх</Text>
        </Button>
        <Box className="w-[calc(calc(100vw-235px)/2)] h-0.5 bg-gray" />
      </Box>
    </Box>
  );
}
