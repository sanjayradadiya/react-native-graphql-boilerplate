import React from 'react';
import { Text } from 'react-native';
import Styled from './styles';
import useRouter from '@services/routing/useRouter';
import { useEffect } from 'react';

const SplashScreen = () => {
  const { navigate, routes } = useRouter();
  useEffect(() => {
    const timeOut = setTimeout(() => {
      navigate(routes.auth.login);
    }, 1000);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <Styled.Container>
      <Text>JDA</Text>
    </Styled.Container>
  );
};

export default SplashScreen;
