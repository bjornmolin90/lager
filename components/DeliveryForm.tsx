import { useState, useEffect } from 'react';
import { Base, Typography, Form } from '../styles';
import { Picker } from '@react-native-picker/picker';
import productModel from "../models/products";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import deliveryModel from "../models/deliveries";
import config from "../config/config.json";

import Delivery from '../interfaces/delivery';

export default function DeliveryForm({ navigation }) {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState({});

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.h2}>Ny inleverans</Text>

            <Text style={Typography.text}>Kommentar</Text>
            <TextInput style={Form.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content })
                }}
                value={delivery?.comment}
                testID="comment-field"
            />

            <Text style={Typography.text}>Antal</Text>
            <TextInput style={Form.input}
            onChangeText={(content: string) => {
                setDelivery({ ...delivery, amount: parseInt(content) })
            }}
            value={delivery?.amount?.toString()}
            keyboardType="numeric"
            testID="amount-field"
            />

            <Text style={Typography.text}>Produkt</Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={Typography.text}>Datum</Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
            />

            <Button
                title="Gör inleverans"
                onPress={() => {
                    addDelivery();
                }}
                accessibilityLabel={`Gör inleverans genom att trycka`}
            />
        </ScrollView>
    );

    async function addDelivery() {
        await deliveryModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0),
            api_key: config.api_key
        };

        await productModel.updateProduct(updatedProduct);

        navigation.navigate("List", { reload: true });
    }
};

function ProductDropDown(props) {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id} />;
    });

    return (
        <Picker style={Form.input}
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue });
                props.setCurrentProduct(productsHash[itemValue]);
            }}>
            {itemsList}
        </Picker>
    );
};

function DateDropDown(props) {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === "android" && (
                <Button onPress={showDatePicker} title="Visa datumväljare" />
            )}
            {(show || Platform.OS === "ios") && (
                <DateTimePicker
                    onChange={(event, date) => {
                        setDropDownDate(date);

                        props.setDelivery({
                            ...props.delivery,
                            delivery_date: date.toLocaleDateString('se-SV'),
                        });

                        setShow(false);

                    }}
                    value={dropDownDate}

                />

            )}
        </View>
    );
}
