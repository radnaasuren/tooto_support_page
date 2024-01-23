"use client";
import ArticleIcon from "@/assets/icons/article";
import SkeletonIcon from "@/assets/icons/skeletonIcon";
import { Box, Text } from "@/components";
import { GET_CATEGORIES_QUERY } from "@/graphql";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ArticleType {
  description: string;
  title: string;
  _id: string;
}
interface FilteredData {
  category: string;
  groupName: string;
  articles: ArticleType[];
  icon?: {
    url: string;
  };
}

const Page = () => {
  const router = useRouter();
  const path = useSearchParams();
  const [FilteredData, setFilteredData] = useState<FilteredData[]>([]);
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

  useEffect(() => {
    const updatedFilteredData: FilteredData[] = [];

    const updateData = async () => {
      for (const category of data?.getCategoryAndGroupsInfo || []) {
        for (const group of category.group) {
          const upperCaseGroupName = group.groupName?.toUpperCase();

          if (upperCaseGroupName.includes(SearchString.toUpperCase())) {
            updatedFilteredData.push({
              category: category.name,
              ...group,
              icon: category.icon,
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
                  });
                }
              }
            }
          }
        }
      }
      setFilteredData(mergeFilteredData(updatedFilteredData));
    };

    updateData();
  }, [path, data, setFilteredData]);
  console.log(FilteredData);
  return (
    <Box className="w-full h-fit flex-col py-16 items-center">
      {loading == true && (
        <Box className="bg-[white] w-[360px] md:w-[1140px] h-fit p-[30px] flex-col gap-5">
          <Box className="flex-col gap-5">
            <Box className="gap-4 items-center">
              <SkeletonIcon />
              <Box className="animate-pulse bg-skeleton_gray skeleton w-[35%] xl:w-[25%] h-[22px] rounded-none" />
            </Box>
            <Box className="animate-pulse bg-skeleton_gray skeleton w-[85%] h-[22px] rounded-none" />
            <Box className="animate-pulse bg-skeleton_gray skeleton w-[90%] h-[22px] rounded-none" />
            <Box className="animate-pulse bg-skeleton_gray skeleton w-[85%] h-[22px] rounded-none" />
            <Box className="animate-pulse bg-skeleton_gray skeleton w-[90%] h-[22px] rounded-none" />
            <Box className="animate-pulse bg-skeleton_gray skeleton w-[80%] h-[22px] rounded-none" />
          </Box>
        </Box>
      )}
      {loading == false &&
        FilteredData.length !== 0 &&
        FilteredData.map((doc: FilteredData, indx) => (
          <Box
            className="bg-[white] w-[360px] md:w-[1140px] h-fit p-[30px] flex-col gap-5"
            key={indx}
          >
            <Box className="gap-4 flex items-center">
              <Box className="w-[50px] h-[50px]">
                <Image
                  className="min-w-[50px]"
                  alt="category"
                  src={doc?.icon?.url || ""}
                  width={50}
                  height={50}
                />
              </Box>
              <Text className="font-bold text-xl">{doc?.category}</Text>
            </Box>
            <Text className="font-semibold">{doc?.groupName}</Text>
            {doc?.articles.map(({ _id, title }: ArticleType) => (
              <Box
                key={_id}
                className="flex items-center gap-4 h-fit "
                onClick={() => router.push(`/doc?id=${_id}`)}
              >
                <ArticleIcon />
                <Text className="text-base break-words w-[272px] font-semibold text-primary">
                  {title}
                </Text>
              </Box>
            ))}
          </Box>
        ))}
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
