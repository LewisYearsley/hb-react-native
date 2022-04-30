import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { RootStackParamList } from 'src/navigation';
import { ProductListScreen } from 'src/screens';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = (): ReactElement => (
  <NavigationContainer>
    <StatusBar />
    <Stack.Navigator>
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
