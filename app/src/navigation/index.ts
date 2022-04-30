import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Product } from 'src/models';

type RootStackParamList = {
  readonly ProductList: undefined;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

export type { RootStackParamList, RootStackNavigation };
