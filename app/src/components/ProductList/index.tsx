import React, { ReactElement } from 'react';

import {
  FlatList,
  Image,
  ListRenderItem,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { Product } from 'src/models';

import styles from './index.styles';

type ProductListProps = {
  readonly products: readonly Product[];
  readonly onSelectProduct?: (product: Product) => void;
};

const ProductList = ({ products, onSelectProduct = undefined }: ProductListProps): ReactElement => {
  if (products.length === 0) {
    return <Text>No products found.</Text>;
  }

  const renderItem: ListRenderItem<Product> = ({ item: product }) => {
    const { name, images } = product;

    return (
      <TouchableWithoutFeedback onPress={() => onSelectProduct?.(product)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{name}</Text>
          <Image style={styles.productImage} source={{ uri: `https:${images[0].list[0].path}` }} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return <FlatList data={products} renderItem={renderItem} />;
};

export { ProductList };