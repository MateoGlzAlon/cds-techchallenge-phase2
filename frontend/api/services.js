import axios from "axios"

const API_URL = "http://localhost:5000/api/v1"

export const getHotelByName = async (nameHotel) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/getHotelByName`, {
      params: { nameHotel }
    })
    return response.data
  } catch (error) {
    console.error("Error en getHotelByName:", error)
    throw error
  }
}

export const getHotelById = async (hotelId) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/${hotelId}`)
    console.log("response is,", response)
    return response.data
  } catch (error) {
    console.error("Error en getHotelById:", error)
    throw error
  }
}

export const getRouteById = async (routeId) => {
  try {
    const response = await axios.get(`${API_URL}/routes/${routeId}`)
    console.log("response is,", response)
    return response.data
  } catch (error) {
    console.error("Error en getRouteById:", error)
    throw error
  }
}

export const getHotelInfoWithOccupancyByName = async (nameHotel) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/getHotelInfoWithOccupancyByName`, {
      params: { nameHotel }
    })
    return response.data
  } catch (error) {
    console.error("Error en getHotelInfoWithOccupancyByName:", error)
    throw error
  }
}

export const getHotelInfoWithComments = async (nameHotel) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/getHotelInfoWithComments`, {
      params: { nameHotel }
    })
    return response.data
  } catch (error) {
    console.error("Error en getHotelInfoWithComments:", error)
    throw error
  }
}

export const getHotelInfoWithAllByName = async (nameHotel) => {
  try {
    const response = await axios.get(`${API_URL}/hotels/getHotelInfoWithAllByName`, {
      params: { nameHotel }
    })
    return response.data
  } catch (error) {
    console.error("Error en getHotelInfoWithAllByName:", error)
    throw error
  }
}

export const getAllHotels = async () => {
  try {
    const response = await axios.get(`${API_URL}/hotels/all`)
    return response.data
  } catch (error) {
    console.error("Error en getAllHotels:", error)
    throw error
  }
}

export const getAllTrayectories = async (origin, destination) => {
  try {
    const response = await axios.get(`${API_URL}/distance/getAllTrayectories`, {
      params: { origin, destination }
    })
    return response.data
  } catch (error) {
    console.error("Error en getAllTrayectories:", error)
    throw error
  }
}

export const getAllRoutes = async () => {
  try {
    const response = await axios.get(`${API_URL}/routes/all`)
    return response.data
  } catch (error) {
    console.error("Error en getAllRoutes:", error)
    throw error
  }
}

export const createRoute = async (route) => {
  try {
    const response = await axios.post(`${API_URL}/routes/addRoute`, route)
    return response.data
  } catch (error) {
    console.error("Error en createRoute:", error)
    throw error
  }
}

export const calculateDistances = async (origen, destino) => {
  try {
    const response = await axios.get(`${API_URL}/distance/getAllTrayectories`, {
      params: { origin : origen, destination: destino }
    })
    return response.data
  } catch (error) {
    console.error("Error en calculateDistance:", error)
    throw error
  }
}
