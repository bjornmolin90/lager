import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import warehouse from './assets/warehouse.jpg';
import Stock from './components/Stock.tsx';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.base}>
        <Text style={{color: '#00FFFF', fontSize: 40, marginBottom: 10, marginTop: 10, textAlign: "center"}}>Lager-Appen</Text>
        <Image source={warehouse} style={{ width: 335, height: 220, marginBottom: 15 }} />
        <Stock />
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  base: {
    flex: 1,
    backgroundColor: '#252525',
    paddingLeft: 12,
    paddingRight: 12,
}

});
