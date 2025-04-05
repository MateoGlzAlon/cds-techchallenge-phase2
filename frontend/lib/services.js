const API_URL = "http://localhost:5000/api/v1";

export const getHotelByName = async (nameHotel) => {
  try {
    const response = await fetch(
      `${API_URL}/hotels/getHotelByName?nameHotel=${nameHotel}`
    );
    if (!response.ok) {
      throw new Error("Error fetching hotel by name");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getHotelByName:", error);
    throw error;
  }
};

export const getHotelInfoWithOccupancyByName = async (nameHotel) => {
  try {
    const response = await fetch(
      `${API_URL}/hotels/getHotelInfoWithOccupancyByName?nameHotel=${nameHotel}`
    );
    if (!response.ok) {
      throw new Error("Error fetching hotel info with occupancy");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getHotelInfoWithOccupancyByName:", error);
    throw error;
  }
};

export const getHotelInfoWithComments = async (nameHotel) => {
  try {
    const response = await fetch(
      `${API_URL}/hotels/getHotelInfoWithComments?nameHotel=${nameHotel}`
    );
    if (!response.ok) {
      throw new Error("Error fetching hotel info with comments");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getHotelInfoWithComments:", error);
    throw error;
  }
};

export const getHotelInfoWithAllByName = async (nameHotel) => {
  try {
    const response = await fetch(
      `${API_URL}/hotels/getHotelInfoWithAllByName?nameHotel=${nameHotel}`
    );
    if (!response.ok) {
      throw new Error("Error fetching hotel info with all details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getHotelInfoWithAllByName:", error);
    throw error;
  }
};

export const getAllHotels = async () => {
  try {
    const response = await fetch(`${API_URL}/hotels/all`);
    if (!response.ok) {
      throw new Error("Error fetching hotels");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllHotels:", error);
    throw error;
  }
};

export const getAllTrayectories = async (origin, destination) => {
  try {
    const response = await fetch(
      `${API_URL}/distance/getAllTrayectories?origin=${origin}&destination=${destination}`
    );
    if (!response.ok) {
      throw new Error("Error fetching trayectories");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllTrayectories:", error);
    throw error;
  }
};

export const getAllRoutes = async () => {
  try {
    const response = await fetch(`${API_URL}/routes/all`);
    if (!response.ok) {
      throw new Error("Error fetching routes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en getAllRoutes:", error);
    throw error;
  }
};

export const createRoute = async (route) => {
  try {
    const response = await fetch(`${API_URL}/routes/addRoute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(route),
    });
    if (!response.ok) {
      throw new Error("Error creating route");
    }
    return await response.json();
  } catch (error) {
    console.error("Error en createRoute:", error);
    throw error;
  }
};
