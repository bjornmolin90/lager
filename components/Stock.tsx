// components/Stock.tsx
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

function StockList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${config.base_url}/products?api_key=${config.api_key}`)
      .then(response => response.json())
      .then(result => setProducts(result.data));
  }, []);

  const list = products.map((product, index) => <Text style={{color: '#FEFCFF', fontSize: 20, marginBottom: 2}} key={index}>{ product.name }  -   { product.stock }</Text>);

  return (
    <View>
      {list}
    </View>
  );
}

export default function Stock() {
  return (
    <View>
      <Text style={{color: '#FEFCFF', fontSize: 30, paddingBottom: 4}}>Lagerförteckning</Text>
      <Text style={{color: '#FEFCFF', fontSize: 22, fontWeight: "bold"}}>Produkter | Antal</Text>
      <StockList/>
    </View>
  );
}
