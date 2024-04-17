import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

import {routes} from './routesConfig';

export default function useRouter() {
  const navigationHook = useNavigation();
  const routeHook = useRoute();
  const isFocused = useIsFocused();

  const navigate = (screen: string, params?: any) => {
    return navigationHook.navigate(screen, params);
  };

  return {
    navigation: navigationHook,
    routes,
    params: routeHook.params,
    isFocused,
    navigate,
    goBack: navigationHook.goBack,
  };
}

export type UseRouterReturnType = ReturnType<typeof useRouter>;
