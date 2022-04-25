import { Platform, ScrollView, Text, TextInput, Button, View } from "react-native";
import orderModel from "../../models/orders.ts";
import { useState, useEffect } from 'react';
import { Form, Base, Typography } from '../../styles';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import invoiceModel from "../../models/invoices.ts";

export default function CreateInvoice({ navigation }) {
    const [invoice, setInvoice] = useState({});

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.h2}>Ny inleverans</Text>

            <Text style={Typography.text}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={Typography.text}>Datum</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Button
                title="Skapa faktura"
                onPress={() => {
                    addInvoice();
                }}
            />
        </ScrollView>
    );

    async function addInvoice() {
        await invoiceModel.addInvoice(invoice);

        navigation.navigate("List", { reload: true });
    }
};

function OrderDropDown(props) {
    const [orders, setOrders] = useState([]);

    useEffect(async () => {
        setOrders(await orderModel.getOrders());
    }, []);

    const itemsList = orders.filter(order => order.status === "Packad")
    .map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker style={Form.input}
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) => {
                props.setInvoice({ ...props.invoice, order_id: itemValue });
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

                        props.setInvoice({
                            ...props.invoice,
                            creation_date: date,
                        });

                        setShow(false);

                    }}
                    value={dropDownDate}

                />

            )}
        </View>
    );
}
