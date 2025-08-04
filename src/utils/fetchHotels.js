import hotelApi from "../api/hotel";

export default async function fetchHotels() {
  try {
    const response = await hotelApi.getHotels();
    const data = response.data.hotels;
    const hotelList = data.map(item => ({
            hotel_id_1: item.Hotel_id,
            name: item.Hotel_name,
            location: item.Hotel_location,
        }))
    return hotelList;
  } catch (error) {
    console.error("Error fetching hotels:", error);
    throw error;
  }
}