import { useQuery } from "@tanstack/react-query";
import api from "../api/api";

export const useFetchMyShortUrls = (token, options = {}) => {
  return useQuery({
    queryKey: ["my-shortenurls"],
    enabled: !!token,
    queryFn: async () => {
      const response = await api.get(
        "/api/urls/myurls",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // ✅ ORIGINAL DATA
    },
    staleTime: 5000,
    ...options,
  });
};

// useQuery.jsx
export const useFetchTotalClicks = (token, startDate, endDate, options = {}) => {
  return useQuery({
    queryKey: ["url-totalclick", startDate, endDate],
    enabled: !!token && !!startDate && !!endDate,
    queryFn: async () => {
      const response = await api.get("/api/urls/totalClicks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { startDate, endDate }, // ✅ proper query params
      });
      return response.data;
    },
    select: (data) =>
      Object.keys(data).map((key) => ({
        clickDate: key,
        count: data[key],
      })),
    staleTime: 5000,
    ...options, // safe now, won't affect URL
  });
};

