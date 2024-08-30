import http from '../..';

/**
 * POST request handler
 * @param url - API endpoint
 * @returns - Function to handle POST requests
 */
export const postHandler = <T, S>(url: string) => {
  return async (data: T): Promise<S | null> => {
    try {
      const res = await http<S>(url, {
        body: JSON.stringify(data),
        method: 'POST',
      });
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
