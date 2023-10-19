import { Destination } from "../types";
import Loading from "./Loading";

type DestinationCardProps = {
  loading?: boolean;
  destination: Destination | null;
};

const DestinationCard = ({ loading, destination }: DestinationCardProps) => {
  if (!loading && !destination) {
    return <></>;
  }

  return (
    <article className="flex items-start p-6 bg-slate-500 rounded-lg mt-5 w-full h-52 content-center">
      <Loading isLoading={loading} />

      {destination && !loading && (
        <div className="min-w-100 relative text-left">
          <h2 className="font-semibold text-white truncate pr-20 text-lg">
            {destination.name}
          </h2>

          <p className="py-2">{destination.description}</p>

          <p>
            <span className="font-bold py-1 pr-2">Country</span>
            <span className="font-light">{destination.country}</span>
          </p>

          <p>
            <span className="font-bold py-1 pr-2">Climate</span>
            <span className="font-light">{destination.climate}</span>
          </p>

          <p>
            <span className="font-bold py-1 pr-2">Currency</span>
            <span className="font-light">{destination.currency}</span>
          </p>
        </div>
      )}
    </article>
  );
};

export default DestinationCard;
