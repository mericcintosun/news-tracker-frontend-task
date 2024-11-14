import axios from "axios";
import { filterArticles } from "./filterArticles";

const API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

export const fetchNews = async (
  { category = "", sources = [] } = {},
  signal
) => {
  const params = {
    language: "en",
    apiKey: API_KEY,
  };

  if (sources.length > 0) {
    params.sources = sources.join(",");
  } else if (category) {
    params.category = category;
  }

  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params,
      signal,
    });
    const articles = response.data.articles;
    return filterArticles(articles);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("İstek iptal edildi:", error.message);
    } else {
      console.error("API çağrısı sırasında bir hata oluştu:", error);
    }
    return [];
  }
};

// import axios from "axios";
// import { filterArticles } from "./filterArticles";

// const API_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

// export const fetchNews = async ({ category = "", sources = [] } = {}) => {
//   const params = {
//     language: "en",
//     apiKey: API_KEY,
//   };

//   if (sources.length > 0) {
//     params.sources = sources.join(",");
//   } else if (category) {
//     params.category = category;
//   }

//   try {
//     const response = await axios.get("https://newsapi.org/v2/top-headlines", {
//       params,
//     });
//     const articles = response.data.articles;
//     return filterArticles(articles);
//   } catch (error) {
//     console.error("API çağrısı sırasında bir hata oluştu:", error);
//     return [];
//   }
// };
