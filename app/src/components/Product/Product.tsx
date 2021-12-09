import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import styles from './Product.style';

const DataSection = ({ label, value }) => {
    return (
        <View style={{ marginVertical: 10, }}>
            <View style={styles.labelContainer}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10, }}>{label}</Text>
            </View>
            <View style={styles.valueCOntainer}>
                <Text style={{ fontSize: 14, }}>{value}</Text>
            </View>
        </View>
    )
}

const PromotionsList = ({promotions}) => {

    return (
        <View style={{marginVertical: 10,}}>
            <View><Text style={{ color: 'green', fontWeight: 'bold', }}>Promotion Sales</Text></View>
            {promotions.map(promotion => <View><Text>- {promotion.text}</Text></View>)}
        </View>
    )
}

const Product = (props) => {
    const product = props.route.params.product;
    const [images, setImages] = useState([])

    useEffect(() => {
        setImages(product.images.map(image => `https:${image.list[2].path}`))
    }, [])


    return (
        <SafeAreaView style={styles.areaContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.sliderContainer}>
                    <SliderBox
                        ImageComponentStyle={{ borderRadius: 15, height: 400, marginTop: 5 }}
                        images={images}
                    />

                </View>
                <Text style={styles.heading}>{product.name}</Text>

                {product.promotions.length ? <PromotionsList promotions={product.promotions} /> : null}

                <DataSection
                    label="Price"
                    value={product.price_per_uom}
                />
                <DataSection
                    label="Rating"
                    value={product.rating}
                />
                <DataSection
                    label="Status"
                    value={product.stock_status}
                />
                <DataSection
                    label="Description"
                    value={product.description}
                />

            </ScrollView>
            <View>
                <TouchableOpacity style={{padding: 10, borderWidth: 1, borderRadius: 10, alignItems: 'center', borderColor: '#ccc', backgroundColor: '#ccccccae', margin: 10,}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold' }}>Buy now + </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Product
