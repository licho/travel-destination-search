import { useEffect, useState } from "react";
import {
  searchDestinationsByName,
  getDestinationById,
  getNearbyDestinations,
} from "./fake-api";
import { Destination } from "./types";

export function useDestinationSearch(initialSearchTerm: Destination["name"]) {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    setLoading(true);

    searchDestinationsByName(searchTerm)
      .then((results) => {
        setError(false);
        setSearchResults(results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(true);
        setLoading(false);
      });
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    loading,
    error,
  };
}

export function useDestinationInfo(
  initialDestinationId: Destination["id"] | null
) {
  const [destinationId, setDestinationId] = useState(initialDestinationId);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (destinationId !== null) {
      setLoading(true);

      getDestinationById(destinationId)
        .then((result) => {
          setDestination(result);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [destinationId]);

  return {
    destinationId,
    setDestinationId,
    destination,
    loading,
  };
}

export function useNearbyDestinations(
  initialDestinationId: Destination["id"] | null
) {
  const [destinationId, setDestinationId] = useState(initialDestinationId);
  const [nearbyDestinations, setNearbyDestinations] = useState<Destination[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (destinationId !== null) {
      setLoading(true);

      getNearbyDestinations(destinationId)
        .then((results) => {
          setNearbyDestinations(results);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    }
  }, [destinationId]);

  return {
    destinationId,
    setDestinationId,
    nearbyDestinations,
    loading,
  };
}
