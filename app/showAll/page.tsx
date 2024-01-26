"use client";
import { Box } from "@/components";
import { Card } from "@/components/card";
import { SkeletonLoading } from "@/components/skeletonloading";
import { GET_CATEGORIES_QUERY } from "@/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

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
  name: string;
  _id: string;
  icon: {
    url: string;
  };
  totalArticle: number;
}
const Page = () => {
  const { data, loading } = useQuery(GET_CATEGORIES_QUERY);
  const [updatedArray, setUpdatedArray] = useState<
    [CategoryType[], CategoryType[], CategoryType[]] | []
  >([]);

  useEffect(() => {
    const calculateTotalArticles = async () => {
      if (loading === false && data?.getCategoryAndGroupsInfo) {
        const originalArray: Array<CategoryType> =
          data.getCategoryAndGroupsInfo;
        const updatedArray = await Promise.all(
          originalArray.map(async (category) => {
            let totalArticles = 0;
            await Promise.all(
              category.group.map(async (group) => {
                const articleLength = group.articles.length;
                totalArticles = totalArticles + articleLength;
              }),
            );
            return { ...category, totalArticle: totalArticles };
          }),
        );

        updatedArray.sort((a, b) => b.totalArticle - a.totalArticle);

        if (updatedArray.length >= 3) {
          const firstIndices = [
            0,
            updatedArray.length - 1,
            Math.floor(updatedArray.length / 3),
            Math.floor((2 * updatedArray.length) / 3),
          ];
          const secondIndices = [
            1,
            updatedArray.length - 2,
            Math.floor(updatedArray.length / 3) + 1,
            Math.floor((2 * updatedArray.length) / 3) - 1,
          ];
          const thirdIndices = [
            2,
            updatedArray.length - 3,
            Math.floor(updatedArray.length / 3) + 2,
            Math.floor((2 * updatedArray.length) / 3) - 2,
          ];

          const firstArray = firstIndices
            .map((index) => updatedArray[index])
            .sort((a, b) => b.totalArticle - a.totalArticle);
          const secondArray = secondIndices
            .map((index) => updatedArray[index])
            .sort((a, b) => b.totalArticle - a.totalArticle);
          const thirdArray = thirdIndices
            .map((index) => updatedArray[index])
            .sort((a, b) => b.totalArticle - a.totalArticle);
          setUpdatedArray([firstArray, secondArray, thirdArray]);
        } else {
          setUpdatedArray([]);
        }
      }
    };
    calculateTotalArticles();
  }, [loading, data]);

  return (
    <Box className="w-full h-fit flex-col py-16 items-center">
      <Box className="w-fit xl:w-[1140px] h-fit flex gap-[30px] grid xl:grid-cols-3">
        {loading == false
          ? data?.getCategoryAndGroupsInfo &&
            updatedArray?.map((Categorys, index) => (
              <Box className="w-fit h-fit flex-col gap-[10px]" key={index}>
                {Categorys.map(({ name, group, _id, icon }: CategoryType) => (
                  <Card
                    key={_id}
                    Icon={icon}
                    category={name}
                    groups={group}
                    showAll={true}
                    categoryId={_id}
                  />
                ))}
              </Box>
            ))
          : Array(6)
              .fill("")
              .map((val, index) => <SkeletonLoading key={index} />)}
      </Box>
    </Box>
  );
};
export default Page;
