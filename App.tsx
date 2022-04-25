import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home.tsx";
import Pick from "./components/Pick.tsx";
import Deliveries from "./components/Deliveries.tsx";
import Auth from "./components/auth/Auth.tsx";
import Invoices from "./components/auth/Invoices.tsx";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base, Typography } from './styles';
import { useState, useEffect } from 'react';
import authModel from './models/auth.ts'

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Leverans": "car",
  "Logga in": "lock-open-outline",
  "Faktura": "document-outline",
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(async () => {
      setIsLoggedIn(await authModel.loggedIn());
    }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Leverans">
            {() => <Deliveries products={products} setProducts={setProducts} />}
          </Tab.Screen>
          {isLoggedIn ?
              <Tab.Screen name="Faktura">
                    {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
                  </Tab.Screen> :
          <Tab.Screen name="Logga in">
                {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
              </Tab.Screen>
            }
      </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
