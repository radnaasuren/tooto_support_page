"use client";
import ArticleIcon from "@/assets/icons/article";
import { Box, Button, Text } from "@/components";
import { SkeletonLoading } from "@/components/skeletonloading";
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
  const [FilteredData, setFilteredData] = useState<FilteredData[][]>([]);
  const { data, loading } = useQuery(GET_CATEGORIES_QUERY);
  const SearchString = path.get("search") || "";
  const router = useRouter();

  function transformArray(arr: FilteredData[]): FilteredData[][] {
    const result: FilteredData[][] = [[], [], []];
    const len = arr.length;
    const pairs = Math.min(Math.ceil(len / 2), 3);

    for (let i = 0; i < pairs; i++) {
      if (i < 2) {
        result[i].push(arr[i], arr[len - 1 - i]);
      } else {
        for (let j = i; j < len - i; j++) {
          result[j % 3].push(arr[j]);
        }
        break;
      }
    }
    result.forEach((subArray) => {
      const uniqueSubArray = Array.from(new Set(subArray));
      subArray.length = 0;
      uniqueSubArray.forEach((item) => subArray.push(item));
    });
    return result;
  }

  useEffect(() => {
    const updateData = async () => {
      setFilteredData([[], [], []]);
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
      const Lane = transformArray(
        updatedFilteredData.sort(
          (a, b) => a.articles.length - b.articles.length,
        ),
      );
      setFilteredData(Lane);
    };
    if (SearchString) {
      updateData();
    }
  }, [path, data, SearchString]);

  return (
    <Box className="w-full h-fit flex-col py-16 items-center">
      <Box className="w-[360px] md:w-[1140px] h-fit  gap-5  grid xl:grid-cols-3">
        <Box className="w-fit h-fit flex-col gap-[10px]">
          {FilteredData[0]?.map(
            ({
              groupName,
              category,
              categoryId,
              icon,
              articles,
            }: FilteredData) => (
              <Box
                key={categoryId}
                className="h-fit w-[360px] flex mb-[30px]"
                id={categoryId}
              >
                <Box
                  className={`bg-[white] h-fit w-full flex-col gap-[20px] p-[30px] text-primary`}
                >
                  <Box className="gap-4 flex items-center">
                    <Box className="w-[50px] h-[50px] flex items-center justify-center">
                      <Image
                        alt="category"
                        src={icon?.url}
                        width={50}
                        height={50}
                      />
                    </Box>
                    <Button
                      onClick={() => router.push(`/category?id=${categoryId}`)}
                    >
                      <Text className="font-bold text-xl text-left">
                        {category}
                      </Text>
                    </Button>
                  </Box>
                  <Text className="font-bold text-lg">{groupName}</Text>
                  {articles.map(({ _id, title }: ArticleType) => (
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
              </Box>
            ),
          )}
        </Box>
        <Box className="w-fit h-fit flex-col gap-[10px]">
          {FilteredData[1]?.map(
            ({
              groupName,
              category,
              categoryId,
              icon,
              articles,
            }: FilteredData) => (
              <Box
                key={categoryId}
                className="h-fit w-[360px] flex mb-[30px]"
                id={categoryId}
              >
                <Box
                  className={`bg-[white] h-fit w-full flex-col gap-[20px] p-[30px] text-primary`}
                >
                  <Box className="gap-4 flex items-center">
                    <Box className="w-[50px] h-[50px] flex items-center justify-center">
                      <Image
                        alt="category"
                        src={icon?.url}
                        width={50}
                        height={50}
                      />
                    </Box>
                    <Button
                      onClick={() => router.push(`/category?id=${categoryId}`)}
                    >
                      <Text className="font-bold text-xl text-left">
                        {category}
                      </Text>
                    </Button>
                  </Box>
                  <Text className="font-bold text-lg">{groupName}</Text>
                  {articles.map(({ _id, title }: ArticleType) => (
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
              </Box>
            ),
          )}
        </Box>
        <Box className="w-fit h-fit flex-col gap-[10px]">
          {FilteredData[2]?.map(
            ({
              groupName,
              category,
              categoryId,
              icon,
              articles,
            }: FilteredData) => (
              <Box
                key={categoryId}
                className="h-fit w-[360px] flex mb-[30px]"
                id={categoryId}
              >
                <Box
                  className={`bg-[white] h-fit w-full flex-col gap-[20px] p-[30px] text-primary`}
                >
                  <Box className="gap-4 flex items-center">
                    <Box className="w-[50px] h-[50px] flex items-center justify-center">
                      <Image
                        alt="category"
                        src={icon?.url}
                        width={50}
                        height={50}
                      />
                    </Box>
                    <Button
                      onClick={() => router.push(`/category?id=${categoryId}`)}
                    >
                      <Text className="font-bold text-xl text-left">
                        {category}
                      </Text>
                    </Button>
                  </Box>
                  <Text className="font-bold text-lg">{groupName}</Text>
                  {articles.map(({ _id, title }: ArticleType) => (
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
              </Box>
            ),
          )}
        </Box>
        {loading == true &&
          Array(6)
            .fill("")
            .map((val, index) => <SkeletonLoading key={index} />)}
      </Box>
      {loading == false && FilteredData[0]?.length == 0 && (
        <Box className="md:w-[1140px] w-[290px] flex-col xl:flex-row gap-1">
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
