import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InvoiceList from './InvoiceList.tsx';
import CreateInvoice from './CreateInvoice.tsx';

const Stack = createNativeStackNavigator();

export default function Invoices(props) {
    return (
        <Stack.Navigator initialRouteName="List">

        <Stack.Screen name="List">
            {(screenProps) => <InvoiceList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
        </Stack.Screen>
            <Stack.Screen name="Create">
                {(screenProps) => <CreateInvoice {...screenProps} setProducts={props.setProducts} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
