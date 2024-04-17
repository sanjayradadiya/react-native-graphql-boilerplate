import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator, { navigationRef } from './navigators/';
import { getUrqlClient } from '@services/urql/getUrqlClient';
import { Provider as URProvider } from 'urql';
import useStore from '@services/store/useStore';

export default function RouterProvider() {
  const { selector: auth } = useStore('auth');

  const client = useMemo(
    () => getUrqlClient(auth?.loginData?.jwtToken),
    [auth?.loginData?.jwtToken],
  );

  return (
    <URProvider value={client}>
      <NavigationContainer ref={navigationRef}>
        <RootNavigator />
      </NavigationContainer>
    </URProvider>
  );
}
