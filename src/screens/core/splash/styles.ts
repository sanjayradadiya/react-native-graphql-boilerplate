import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  logo: {
    height: 240,
    width: 280,
    resizeMode: 'contain',
  },
});

export default {
  Container,
  styles,
};
