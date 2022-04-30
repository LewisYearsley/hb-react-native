import React, { ReactElement, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, Text } from 'react-native';

import { getProducts } from 'src/api';
import { ProductList } from 'src/components';
import { Product } from 'src/models';
import { RootStackNavigation } from 'src/navigation';
import usePagination from 'react-native-flatlist-pagination-hook';

const ProductListScreen = (): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const navigation = useNavigation<RootStackNavigation>();

  const { data, addData, onEndReached, pageIndex } = usePagination(10);

  useEffect(() => {
    const getProductsAsync = async () => {
      try {
        await getProducts(pageIndex, 10).then((data: any) => {
          addData(data);
        });
      } catch (error) {
        setErrorMessage((error as Error).message);
      }
    };
    getProductsAsync();
  }, [pageIndex]);

  const onSelectProduct = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  if (!data || data.length == 0) {
    return <ActivityIndicator testID="activity-indicator" />;
  }

  return (
    <ProductList products={data} onEndReached={onEndReached} onSelectProduct={onSelectProduct} />
  );
};

export { ProductListScreen };
