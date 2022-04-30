import React, { ReactElement } from 'react';

import { FlatList, Image, ListRenderItem, Text, TouchableOpacity, View } from 'react-native';
import usePagination from 'react-native-flatlist-pagination-hook';

import { Product } from 'src/models';

import styles from './index.styles';

type ProductListProps = {
  readonly products: readonly Product[];
  readonly onEndReached: () => void;
  readonly onSelectProduct: (product: Product) => void;
};

const ProductList = ({
  products,
  onEndReached,
  onSelectProduct,
}: ProductListProps): ReactElement => {
  if (products.length === 0) {
    return <Text>No products found.</Text>;
  }

  const renderItem: ListRenderItem<Product> = ({ item: product }) => {
    const { name, images } = product;

    return (
      <TouchableOpacity
        style={{ borderRadius: 25, borderWidth: 2 }}
        onPress={() => onSelectProduct?.(product)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{name}</Text>
          <Image style={styles.productImage} source={{ uri: `https:${images[0].list[0].path}` }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      onEndReachedThreshold={0.5}
      onEndReached={onEndReached}
      numColumns={2}
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export { ProductList };
