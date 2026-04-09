const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  REGISTER: `${API_URL}/register`,
  LOGIN: `${API_URL}/login`,
  FOOD_SEARCH: (name) => `${API_URL}/food/${encodeURIComponent(name)}`,
  TRACK: `${API_URL}/track`,
  TRACK_BY_DATE: (userId, date) => `${API_URL}/track/${userId}/${date}`,
};
