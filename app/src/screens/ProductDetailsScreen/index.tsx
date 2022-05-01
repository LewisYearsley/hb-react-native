import React, { ReactElement, useLayoutEffect } from 'react';

import { Image, ImageStore, ScrollView, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { ProductDetailRoute, RootStackNavigation } from 'src/navigation';

import styles from './index.styles';

const ProductDetailScreen = (): ReactElement => {
  const route = useRoute<ProductDetailRoute>();
  const navigation = useNavigation<RootStackNavigation>();

  const product = route.params.product;

  const title = `${product.name}`;

  useLayoutEffect(() => {
    navigation.setOptions({ title: product.name });
  });

  const promotions =
    product.promotions.length > 0
      ? product.promotions.map((promotion, index) => {
          return <Text key={index + promotion.text}>{promotion.text}</Text>;
        })
      : null;

  const images = product.images.map(imageList => {
    return imageList.list.map((image, index) => {
      return (
        <Image
          key={index}
          style={{ width: 50, height: 100 }}
          source={{ uri: `https:${image.path}` }}
        />
      );
    });
  });

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text>Price: £{product.price}</Text>
        <Text>Stock: {product.stock_status}</Text>
        <Text>Promotions: {promotions ? promotions : 'No promotions'}</Text>
        <Text>Rating: {product.rating}</Text>
        <Text>Images:</Text>
        {images}
      </View>
    </ScrollView>
  );
};

export { ProductDetailScreen };
