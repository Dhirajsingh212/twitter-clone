import { redirect } from "next/navigation";

const Page = () => {
  redirect("/feed");
  return <div>Page</div>;
};

export default Page;
