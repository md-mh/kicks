import { baseApi } from "./apiUrl";

// Fetch data from the API server-side with ISR revalidation.
export const getServerData = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(`${baseApi}${url}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
};
