import destinations from "./data.json";
import { haversine } from "./haversine";
import { Destination } from "./types";

// Simulated API function to search for destinations by name
export async function searchDestinationsByName(
  searchName: Destination["name"]
) {
  console.log(`searchDestinationsByName call | searchName: ${searchName}`);

  return new Promise<Destination[]>((resolve, reject) => {
    setTimeout(() => {
      if (searchName === "fail") {
        reject("HTTP 500 Internal Server Error");
      }

      searchName = searchName.toLowerCase();

      const results: Destination[] = destinations.filter((destination) => {
        const lowerCaseName = destination.name.toLowerCase();
        return lowerCaseName.includes(searchName);
      });

      resolve(results);
    }, 1000);
  });
}

// Simulated API function to retrieve destination by ID
export async function getDestinationById(destinationId: Destination["id"]) {
  console.log(`getDestinationById call | destinationId: ${destinationId}`);

  return new Promise<Destination>((resolve, reject) => {
    setTimeout(() => {
      const foundDestination = destinations.find(
        (destination) => destination.id === destinationId
      );

      if (foundDestination) {
        resolve(foundDestination);
      } else {
        reject("HTTP 404 Destination not found");
      }
    }, 1000);
  });
}

// Simulated API function to retrieve nearby destinations by coordinates
export async function getNearbyDestinations(destinationId: Destination["id"]) {
  console.log(`getNearbyDestinations call | destinationId: ${destinationId}`);

  return new Promise<Destination[]>((resolve, reject) => {
    const sourceDestination = destinations.find(
      (destination) => destination.id === destinationId
    );

    if (!sourceDestination) {
      reject("Source destination not found");
      return;
    }

    setTimeout(() => {
      const sortedDestinations = destinations
        .filter((destination) => destination.id !== destinationId)
        .map((destination) => {
          const distance = haversine(
            sourceDestination.latitude,
            sourceDestination.longitude,
            destination.latitude,
            destination.longitude
          );
          return { ...destination, distance };
        })
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 4); // Get the 4 closest destinations

      resolve(sortedDestinations);
    }, 2000);
  });
}
