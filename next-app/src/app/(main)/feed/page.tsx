import { fetchPosts } from "@/actions";
import Feed from "@/components/Feed";

const Page = async ({ searchParams }: any) => {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const dbPosts = await fetchPosts(search);
  return <Feed dbPosts={dbPosts} />;
};

export default Page;
