"use client";
import ArticleIcon from "@/assets/icons/article";
import SkeletonIcon from "@/assets/icons/skeletonIcon";
import { Box, Text } from "@/components";
import { GET_CATEGORY_QUERY } from "@/graphql/GET_CATEGORY";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

interface ArticleType {
  description: string;
  title: string;
  _id: string;
}
interface GroupType {
  groupName: string;
  articles: ArticleType[];
}

const Page = () => {
  const router = useRouter();
  const path = useSearchParams();
  const { data, loading } = useQuery(GET_CATEGORY_QUERY, {
    variables: { id: path.get("id") },
  });

  return (
    <Box className="w-full h-fit flex-col py-16 items-center">
      <Box className="w-[360px] xl:w-[1140px] h-fit">
        <Box className="bg-[white] h-fit w-full flex-col gap-[20px] p-[30px] text-primary">
          {loading == true ? (
            <Box className="flex-col gap-5">
              <Box className="gap-4 items-center animate-pulse">
                <SkeletonIcon />
                <Box className="bg-skeleton_gray skeleton w-[35%] xl:w-[25%] h-[22px] rounded-none" />
              </Box>
              <Box className="animate-pulse bg-skeleton_gray skeleton w-[85%] h-[22px] rounded-none" />
              <Box className="animate-pulse bg-skeleton_gray skeleton w-[90%] h-[22px] rounded-none" />
              <Box className="animate-pulse bg-skeleton_gray skeleton w-[85%] h-[22px] rounded-none" />
              <Box className="animate-pulse bg-skeleton_gray skeleton w-[90%] h-[22px] rounded-none" />
              <Box className="animate-pulse bg-skeleton_gray skeleton w-[80%] h-[22px] rounded-none" />
            </Box>
          ) : (
            data?.getCategoryAndGroupsInfo && (
              <Box className="flex-col gap-[25px]">
                <Box className="gap-4 flex items-center">
                  <Box className="w-[50px] h-[50px]">
                    <Image
                      alt="category"
                      src={data.getCategoryAndGroupsInfo[0].icon.url}
                      width={50}
                      height={50}
                    />
                  </Box>
                  <Text className="font-bold text-xl">
                    {data.getCategoryAndGroupsInfo[0].name}
                  </Text>
                </Box>
                <Box className="w-full grid grid-cols-1 xl:grid-cols-2 gap-[25px] ">
                  {data.getCategoryAndGroupsInfo[0].group?.map(
                    (group: GroupType, index: number) => (
                      <Box className="flex-col w-full gap-[20px]" key={index}>
                        <Text className="text-xl font-semibold">
                          {group.groupName}
                        </Text>
                        {group?.articles?.map(
                          ({ _id, title }: ArticleType, index: number) => (
                            <Box
                              key={index}
                              className="flex items-center gap-4"
                              onClick={() => router.push(`/doc?id=${_id}`)}
                            >
                              <ArticleIcon />
                              <Text className="text-base font-semibold text-primary">
                                {title}
                              </Text>
                            </Box>
                          ),
                        )}
                      </Box>
                    ),
                  )}
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default Page;
