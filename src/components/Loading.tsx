import loadingGif from "../assets/loading.gif";

const Loading = ({ isLoading = false }: { isLoading?: boolean }) => {
  if (!isLoading) {
    return <></>;
  }

  return (
    <div className="w-full">
      <img src={loadingGif} alt="loading..." className="w-10 my-0 mx-auto" />
    </div>
  );
};

export default Loading;
