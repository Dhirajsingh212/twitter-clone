import Spinner from "@/components/Spinner";

const loading = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      <Spinner />
    </div>
  );
};

export default loading;
