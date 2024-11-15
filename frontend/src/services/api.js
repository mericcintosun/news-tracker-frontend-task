import axios from "axios";

export const fetchNews = async () => {
  const response = await axios.get("/api/news");
  return response.data.articles;
};
