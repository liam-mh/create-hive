// src/utils/routerUtils.ts
import { useRouter } from 'expo-router';

interface NavigateToUserProfileParams {
  router: ReturnType<typeof useRouter>; 
  userId: string;
}

export const navigateToUserProfile = ({ router, userId }: NavigateToUserProfileParams) => {
  router.push({
    pathname: '/(tabs)/userProfile',
    params: {
      userId: userId,
    },
  });
};