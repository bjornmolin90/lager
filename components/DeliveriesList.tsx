import deliveryModel from "../models/deliveries.ts";
import { useState, useEffect } from 'react';
import { ScrollView, Text, Button, View } from "react-native";
import { Base, Typography } from '../styles';

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allDeliveries, setAllDeliveries] = useState([]);

    if (reload) {
        reloadDeliveries();
    }
    async function reloadDeliveries() {
        setAllDeliveries(await deliveryModel.getDeliveries());
    }
    useEffect(() => {
        reloadDeliveries();
    }, []);

    const listOfDeliveries = allDeliveries
    .map((delivery, index) => {
        return <View key={index}>
            <Text style={Typography.text}>------------------------------</Text>
            <Text style={Typography.text}>{delivery.product_name}</Text>
            <Text style={Typography.text}>{delivery.amount} st</Text>
            <Text style={Typography.text}>Datum: {delivery.delivery_date} </Text>
            <Text style={Typography.text}>Kommentar: {delivery.comment} </Text>
            </View>
        });
    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.h2}>Inleveranser</Text>
            {listOfDeliveries}
            <Button
                title="Skapa ny inleverans"
                onPress={() => {
                    navigation.navigate('Form');
                }}
            />
        </ScrollView>
    );
};
