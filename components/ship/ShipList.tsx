import { useState, useEffect } from 'react';
import { View, Text, Button } from "react-native";
import config from "./../../config/config.json";
import orderModel from "../../models/orders.ts";
import { Base, Typography, Form } from '../../styles';

export default function OrderList({ route, navigation, allOrders, setAllOrders }) {
    const { reload } = route.params || false;

    if (reload) {
        reloadOrders();
    }
    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }
    useEffect(() => {
        reloadOrders();
    }, []);

    const listOfOrders = allOrders
        .filter(order => order.status === "Packad")
        .map((order, index) => {
            return <Button
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Order', {
                        order: order
                    });
                }}
            />
        });

    return (
        <View>
            <Text style={Typography.hForWhite}>Ordrar redo att skickas</Text>
            {listOfOrders}
        </View>
    );
}
