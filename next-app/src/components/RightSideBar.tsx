import { fetchTopUsers } from "@/actions";
import { Topuser } from "@/types";
import SearchBar from "./SearchBar";
import TopUsers from "./TopUsers";

const RightSideBar = async () => {
  const topUsersData: Topuser[] = await fetchTopUsers();

  return (
    <aside className="lg:w-1/4 lg:pl-4 mt-4 lg:mt-0">
      <div className="relative mb-4">
        <SearchBar />
      </div>
      <TopUsers TopUsersData={topUsersData} />
    </aside>
  );
};

export default RightSideBar;
