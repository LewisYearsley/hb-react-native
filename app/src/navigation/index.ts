import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Product } from 'src/models';

type ProductDetailParams = {
  readonly product: Product;
};

type RootStackParamList = {
  readonly ProductList: undefined;
  readonly ProductDetail: ProductDetailParams;
};

type RootStackNavigation = NativeStackNavigationProp<RootStackParamList>;

type ProductDetailRoute = RouteProp<RootStackParamList, 'ProductDetail'>;

export type { RootStackParamList, RootStackNavigation, ProductDetailRoute };
