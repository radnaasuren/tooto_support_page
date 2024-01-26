"use client";
import { Box, Text } from "@/components";
import { Card } from "@/components/card";
import { SkeletonLoading } from "@/components/skeletonloading";
import { GET_CATEGORIES_QUERY } from "@/graphql";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ArticleType {
  description: string;
  title: string;
  _id: string;
}
interface FilteredData {
  categoryId: string;
  category: string;
  groupName: string;
  articles: ArticleType[];
  icon: {
    url: string;
  };
}

const Page = () => {
  const path = useSearchParams();
  const [FilteredData, setFilteredData] = useState<
    [FilteredData[], FilteredData[], FilteredData[]] | []
  >([]);
  const { data, loading } = useQuery(GET_CATEGORIES_QUERY);
  const SearchString = path.get("search") || "";

  const mergeFilteredData = (filteredData: FilteredData[]): FilteredData[] => {
    const mergedData: { [key: string]: FilteredData } = {};

    filteredData.forEach((item) => {
      const key = `${item.category}_${item.groupName}`;
      if (!mergedData[key]) {
        mergedData[key] = { ...item };
      } else {
        mergedData[key].articles.push(...item.articles);
      }
    });

    const mergedArray = Object.values(mergedData);

    return mergedArray;
  };

  const calculateTotalArticles = async (
    updatedFilteredData: FilteredData[],
  ) => {
    const originalArray: Array<FilteredData> =
      mergeFilteredData(updatedFilteredData);
    originalArray.sort((a, b) => b.articles.length - a.articles.length);

    if (originalArray.length > 3) {
      const firstArray = originalArray.filter((_, index) => index % 3 === 0);
      const secondArray = originalArray.filter((_, index) => index % 3 === 1);
      const thirdArray = originalArray.filter((_, index) => index % 3 === 2);
      setFilteredData([firstArray, secondArray, thirdArray]);
    } else {
      setFilteredData([[...originalArray], [], []]);
    }
  };

  useEffect(() => {
    const updateData = async () => {
      const updatedFilteredData: FilteredData[] = [];
      for (const category of data?.getCategoryAndGroupsInfo || []) {
        for (const group of category.group) {
          const upperCaseGroupName = group.groupName?.toUpperCase();

          if (upperCaseGroupName.includes(SearchString.toUpperCase())) {
            updatedFilteredData.push({
              category: category.name,
              ...group,
              icon: category.icon,
              categoryId: category._id,
            });
          } else {
            for (const article of group.articles) {
              const upperCaseArticleTitle = article.title.toUpperCase();
              const upperCaseArticleDescription =
                article.description?.toUpperCase();
              if (upperCaseArticleTitle.includes(SearchString.toUpperCase())) {
                updatedFilteredData.push({
                  category: category.name,
                  groupName: group.groupName,
                  articles: [article],
                  icon: category.icon,
                  categoryId: category._id,
                });
              } else {
                if (
                  upperCaseArticleDescription.includes(
                    SearchString.toUpperCase(),
                  )
                ) {
                  updatedFilteredData.push({
                    category: category.name,
                    groupName: group.groupName,
                    articles: [article],
                    icon: category.icon,
                    categoryId: category._id,
                  });
                }
              }
            }
          }
        }
      }
      calculateTotalArticles(updatedFilteredData);
    };

    updateData();
  }, [path, data, setFilteredData, SearchString]);

  return (
    <Box className="w-full h-fit flex-col py-16 items-center">
      <Box className="w-[360px] md:w-[1140px] h-fit  gap-5  grid xl:grid-cols-3">
        {loading == false
          ? data?.getCategoryAndGroupsInfo &&
            FilteredData?.map((Lane, index) => (
              <Box className="w-fit h-fit flex-col gap-[10px]" key={index}>
                {Lane.length !== 0 &&
                  Lane.map(
                    ({
                      groupName,
                      category,
                      categoryId,
                      icon,
                      articles,
                    }: FilteredData) => (
                      <Card
                        key={categoryId}
                        Icon={icon}
                        category={category}
                        groups={[{ groupName, articles }]}
                        showAll={true}
                        categoryId={categoryId}
                      />
                    ),
                  )}
              </Box>
            ))
          : Array(6)
              .fill("")
              .map((val, index) => <SkeletonLoading key={index} />)}
      </Box>
      {loading == false && FilteredData.length == 0 && (
        <Box className="md:w-[1140px] w-[290px] flex-col xl:flex-row">
          <Text className="font-semibold text-base md:text-xl text-primary">
            Хайлтад тохирох илэрц олдсонгүй:
          </Text>
          <Text className="font-semibold text-base md:text-xl text-[black]">
            {SearchString}
          </Text>
        </Box>
      )}
    </Box>
  );
};
export default Page;
