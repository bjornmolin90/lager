import { Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ShipList from './ShipList.tsx';
import ShipOrder from './ShipOrder.tsx';

const Stack = createNativeStackNavigator();

export default function Ship(props) {
    return (
        <Stack.Navigator initialRouteName="List">

            <Stack.Screen name="List">
            {(screenProps) => <ShipList {...screenProps} allOrders={props.allOrders} setAllOrders={props.setAllOrders} />}
            </Stack.Screen>
            <Stack.Screen name="Order" component={ShipOrder} />
        </Stack.Navigator>
    );
}
