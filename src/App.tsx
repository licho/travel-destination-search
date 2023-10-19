import "./App.css";
import DestinationCard from "./components/DestinationCard";
import NearbyLocations from "./components/NearbyLocations";
import SearchBox from "./components/SearchBox";

import {
  useDestinationInfo,
  useDestinationSearch,
  useNearbyDestinations,
} from "./apiHooks";

function App() {
  const { setSearchTerm, searchResults, loading, error } =
    useDestinationSearch("");
  const {
    setDestinationId,
    destination,
    loading: loadingInfo,
  } = useDestinationInfo(null);
  const {
    setDestinationId: searchNearby,
    nearbyDestinations,
    loading: loadingNearby,
  } = useNearbyDestinations(null);

  const handleOnChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleOnSelect = (destinationId: number) => {
    setDestinationId(destinationId);
    searchNearby(destinationId);
  };

  const options = searchResults.map((result) => ({
    key: result.id,
    value: result.name,
  }));

  return (
    <div className="text-center flex flex-col items-center w-[450px]">
      <h1 className="mb-5 font-bold text-2xl">Travel destination search ✈️</h1>
      <SearchBox
        options={options}
        loading={loading}
        onChange={handleOnChange}
        onSelect={(option) => {
          handleOnSelect(option.key);
        }}
        error={error}
      />
      <DestinationCard loading={loadingInfo} destination={destination} />
      <NearbyLocations
        loading={loadingNearby}
        destinations={nearbyDestinations}
        onSelect={handleOnSelect}
      />
    </div>
  );
}

export default App;
