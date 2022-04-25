import { useState, useEffect } from 'react';
import { ScrollView, View, Text, Button } from "react-native";
import config from "./../config/config.json";
import invoiceModel from "../../models/invoices.ts";
import { Base, Typography } from '../../styles';
import storageModel from "../../models/storage.ts";
import { DataTable } from 'react-native-paper';

export default function InvoiceList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState([]);

    if (reload) {
        reloadInvoices();
    }
    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }
    useEffect(() => {
        reloadInvoices();
    }, []);

    const tableInvoices = allInvoices
    .map((invoice, index) => {
        return (
            <DataTable.Row key = {index}>
                <DataTable.Cell>{invoice.name}</DataTable.Cell>
                <DataTable.Cell>{invoice.total_price}</DataTable.Cell>
                <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
            </DataTable.Row>
        );

        });
    return (
        <ScrollView>
            <Text style={Typography.hForWhite}>Fakturor</Text>
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title>Pris</DataTable.Title>
                    <DataTable.Title>Förfallodatum</DataTable.Title>
                </DataTable.Header>
                {tableInvoices}
            </DataTable>

            <Button
                title="Skapa ny faktura"
                onPress={() => {
                    navigation.navigate('Create');
                }}
            />
            <Button
                title="Logga ut"
                onPress={() => {
                    logOut();
                }}
            />
        </ScrollView>

    );
    async function logOut() {
        storageModel.deleteToken();
        setIsLoggedIn(false)
    }
};
