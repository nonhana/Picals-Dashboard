import http from '../..';

/**
 * GET request handler
 * @param url - API endpoint
 * @returns - Function to handle GET requests
 */
export const getHandler = <T>(url: string) => {
  return async (data: Record<string, string>): Promise<T | null> => {
    try {
      const query = new URLSearchParams(
        data as Record<string, string>
      ).toString();
      const res = await http<T>(`${url}?${query}`);
      if (res.code === 200) {
        return res.data || null;
      } else {
        console.error('Failed to fetch:', res.message);
        return null;
      }
    } catch (error) {
      console.error('Request error:', error);
      return null;
    }
  };
};
