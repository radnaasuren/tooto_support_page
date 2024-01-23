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
}
const Page = () => {
  const { data, loading } = useQuery(GET_CATEGORIES_QUERY);
  const [ArrayData, setArrayData] = useState<
    [CategoryType[], CategoryType[], CategoryType[]] | undefined
  >(undefined);

  useEffect(() => {
    if (loading === false && data?.getCategoryAndGroupsInfo) {
      const originalArray: Array<CategoryType> = data.getCategoryAndGroupsInfo;
      const firstArray = originalArray.filter((_, index) => index % 3 === 0);
      const secondArray = originalArray.filter((_, index) => index % 3 === 1);
      const thirdArray = originalArray.filter((_, index) => index % 3 === 2);
      setArrayData([firstArray, secondArray, thirdArray]);
    }
  }, [data, loading]);
  console.log(ArrayData);

  return (
    <Box className="w-full h-fit flex-col py-16 items-center">
      <Box className="w-fit xl:w-[1140px] h-fit flex gap-[30px] grid xl:grid-cols-3">
        {loading == false
          ? data?.getCategoryAndGroupsInfo &&
            ArrayData?.map((Category, index) => (
              <Box className="w-fit h-fit flex-col gap-[10px]" key={index}>
                {Category.map(({ name, group, _id, icon }: CategoryType) => (
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
