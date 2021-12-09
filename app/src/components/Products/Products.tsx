import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, SafeAreaView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import Toast from 'react-native-simple-toast';
import styles from './Products.style';

const ProductCard = (props) => {
    const { product } = props;

    const onPress = () => {
        props.navigation.navigate('Product', { product })
    }

    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity onPress={onPress} style={styles.cardContainerInside}>
                <Image source={{ uri: 'https:' + product.images[0].list[0].path }} style={styles.image} />
                <Text>{product.name}</Text>
                <Text>{product.promotions.length ? '🧷' : ''}</Text>
            </TouchableOpacity>
        </View>
    )
}

const Product = (props) => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        let url = `http://10.88.9.218:4000/products/all?page=${page}`; // Change to reflect the right base url
        fetch(url)
            .then(res => res.json())
            .then(responseJson => {
                if (responseJson.length) {
                    setProducts(products.concat(responseJson));
                    setPage(page+1);
                }else {
                    setHasNextPage(false);
                }
            })
    }

    const onEndReached = () => {
        if (hasNextPage) {
            Toast.show('Loading page ' + page, Toast.LONG);
            loadData();
        }
    }

    return (
        <SafeAreaView >
            {loading && <ActivityIndicator color="#ccc" size={23} /> }
            <FlatList
                ListHeaderComponent={() => {
                    return (
                        <View style={styles.headerContainer}>
                            <Text>List of products</Text>
                        </View>
                    );
                }}
                data={products}
                numColumns={2}
                horizontal={false}
                renderItem={({ item }) => <ProductCard product={item} {...props} />}
                keyExtractor={(item) => item.id}
                key={'_'}
                style={styles.container}
                onEndReached={onEndReached}
                ListFooterComponent={(
                    !hasNextPage ? <Text>End of products</Text> : null
                )}
            />
        </SafeAreaView>
    )
}

export default Product
