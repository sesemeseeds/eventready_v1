import { useSession } from '@clerk/clerk-react';

const useFetchClerkToken = () => {
  const fetchClerkToken = async () => {
    try {
      const { getSession } = useSession();
      const session = await getSession();
      return session.token;
    } catch (error) {
      console.error('Error fetching Clerk token:', error);
      return null;
    }
  };

  return fetchClerkToken;
};

export default useFetchClerkToken;
