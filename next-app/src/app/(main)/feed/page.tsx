import { fetchPosts } from "@/actions";
import Feed from "@/components/Feed";

const Page = async () => {
  const dbPosts = await fetchPosts();
  return <Feed dbPosts={dbPosts} />;
};

export default Page;
