import { View, Text } from "react-native";
import { Colors } from "../../src/theme/colors";

export default function Home() {
  return (
    <View style={{ flex:1, backgroundColor: Colors.bg, padding:20 }}>
      <Text style={{ color:"#fff", fontSize:28, fontWeight:"700" }}>
        Spendly
      </Text>

      <View
        style={{
          marginTop:20,
          backgroundColor: Colors.card,
          padding:20,
          borderRadius:24
        }}
      >
        <Text style={{ color:"#94A3B8" }}>Total Balance</Text>
        <Text style={{ color:"#fff", fontSize:34, fontWeight:"700", marginTop:10 }}>
          ৳ 0.00
        </Text>
      </View>
    </View>
  );
}