import { View, Text, Pressable } from "react-native";
import {
  Wallet,
  Landmark,
  Smartphone,
  CreditCard,
  PiggyBank,
} from "lucide-react-native";

import { Colors } from "../../theme/colors";

export default function AccountCard({
  item,
  onEdit,
}: any) {
  const iconSize = 22;
  const color = "#fff";

  const iconMap: any = {
    cash: <Wallet size={iconSize} color={color} />,
    bank: <Landmark size={iconSize} color={color} />,
    mobile: <Smartphone size={iconSize} color={color} />,
    credit: <CreditCard size={iconSize} color={color} />,
    savings: <PiggyBank size={iconSize} color={color} />,
  };

  return (
    <Pressable
      onLongPress={() => onEdit(item)}
      style={{
        backgroundColor: Colors.card,
        padding: 18,
        borderRadius: 24,
        marginBottom: 14,
        borderWidth: 1,
        borderColor: Colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.primary,
            padding: 10,
            borderRadius: 14,
          }}
        >
          {iconMap[item.type]}
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {item.name}
          </Text>

          <Text style={{ color: "#94A3B8" }}>
            {item.type.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: "#10B981",
          fontSize: 28,
          fontWeight: "800",
          marginTop: 18,
        }}
      >
        ৳ {Number(item.balance).toFixed(2)}
      </Text>
    </Pressable>
  );
}