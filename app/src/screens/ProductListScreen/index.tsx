import React, { ReactElement, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Text } from 'react-native';

import { getProducts } from 'src/api';
import { ProductList } from 'src/components';
import { Product } from 'src/models';
import { RootStackNavigation } from 'src/navigation';

const ProductListScreen = (): ReactElement => {
  const [products, setProducts] = useState<readonly Product[]>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigation = useNavigation<RootStackNavigation>();

  useEffect(() => {
    const getProductsAsync = async () => {
      try {
        setProducts(await getProducts());
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    };

    getProductsAsync();
  }, []);

  const onSelectProduct = (product: Product) => {
    console.log('Clicked Product');
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  if (!products) {
    return <ActivityIndicator testID="activity-indicator" />;
  }

  return <ProductList products={products} onSelectProduct={onSelectProduct} />;
};

export { ProductListScreen };
