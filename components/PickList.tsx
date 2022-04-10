import { View, Text, Button } from "react-native";
import orderModel from "../models/orders.ts";
import productModel from "../models/products";
import { useState, useEffect } from 'react';

export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([])
    let itemsAvailable = true;

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true } );
    }

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.stock < item.amount) {
            itemsAvailable = false;
        }
        return <Text
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    if (itemsAvailable) {
        return (
            <View>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>
                <Text>Produkter:</Text>
                {orderItemsList}
                <Button title="Plocka order" onPress={pick} />
            </View>
    )}
    else {
        return (
            <View>
                <Text>{order.name}</Text>
                <Text>{order.address}</Text>
                <Text>{order.zip} {order.city}</Text>
                <Text>Produkter:</Text>
                {orderItemsList}
                <Text>Not all items are available in stock</Text>
            </View>
    )}
};
