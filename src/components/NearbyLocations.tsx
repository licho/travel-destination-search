import { Destination } from "../types";
import Loading from "./Loading";

type NearbyLocationsProps = {
  destinations: Destination[];
  loading?: boolean;
  onSelect?: (destinationId: Destination["id"]) => void;
};

const NearbyLocations = ({
  destinations,
  loading = false,
  onSelect,
}: NearbyLocationsProps) => {
  const handleOnClick = (destinationId: Destination["id"]) => {
    onSelect && onSelect(destinationId);
  };

  if (!loading && destinations.length === 0) {
    return <></>;
  }

  return (
    <article className="flex items-start p-6 bg-slate-500 rounded-lg mt-5 w-full h-44">
      <div className="w-full">
        <h2 className="font-semibold text-white truncate text-left text-lg mb-4">
          Nearby Locations
        </h2>

        <Loading isLoading={loading} />

        {!loading && (
          <div className="flex gap-2 mt-2 w-full flex-wrap">
            {destinations.map((destination) => (
              <button
                onClick={() => {
                  handleOnClick(destination.id);
                }}
                className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg hover:bg-indigo-500"
              >
                {destination.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default NearbyLocations;
