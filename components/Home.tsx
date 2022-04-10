import { Base, Typography } from '../styles';
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from '../assets/warehouse.jpg';
import Stock from './Stock.tsx';

export default function Home({products, setProducts}) {
  return (
    <SafeAreaView style={Base.container}>
      <ScrollView style={Base.base}>
        <Text style={Typography.headerMain}>Lager-Appen</Text>
        <Image source={warehouse} style={Typography.imageMain} />
        <Stock products={products} setProducts={setProducts} />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}
