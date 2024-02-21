import { useQuery } from "react-query"
import * as apiClient from "../api/api-client"
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {



  const { data: hotels } = useQuery(
    "fetchAllHotels",
    () => apiClient.fetchAllHotels()
  );

  console.log(hotels)

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {topRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {bottomRowHotels.map((hotel) => (
            <LatestDestinationCard hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home