import React from 'react';
import { HomePage } from 'features/home/pages';
import styled from 'styled-components/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerContainer>
      <HomePage />
    </GestureHandlerContainer>
  );
};

const GestureHandlerContainer = styled(GestureHandlerRootView)`
  flex: 1;
`;
export default App;
