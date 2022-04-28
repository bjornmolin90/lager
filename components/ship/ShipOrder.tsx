import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from "react-native";
import { Base, Typography, Form } from '../../styles';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import getCoordinates from "../../models/nominatim";
import * as Location from 'expo-location';

export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            setMarker(<Marker
                coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                title={results[0].display_name}
            />);
        })();
    }, []);

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                style={Typography.text}
                key={index}
                >
                    {item.name}: {item.amount} st
            </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.h2}>Skicka order</Text>
            {orderItemsList}
            <Text style={Typography.text}>----------------------------</Text>
            <Text style={Typography.h3}>{order.name}</Text>
            <Text style={Typography.text}>{order.address}</Text>
            <Text style={Typography.text}>{order.zip} {order.city}</Text>
            <View style={styles.container}>
                <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 55.60284,
                    longitude: 13.00095,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}>
                {marker}
                {locationMarker}
                </MapView>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
