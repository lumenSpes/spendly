import { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { Colors } from "../../theme/colors";

export default function EditBalanceModal({
  visible,
  account,
  onClose,
  onSave,
}: any) {
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (account) {
      setBalance(String(account.balance));
    }
  }, [account]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          backgroundColor: "rgba(0,0,0,.5)",
        }}
      >
        <View
          style={{
            backgroundColor: Colors.card,
            padding: 20,
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            Edit Balance
          </Text>

          <TextInput
            value={balance}
            onChangeText={setBalance}
            keyboardType="numeric"
            style={{
              marginTop: 18,
              backgroundColor: Colors.soft,
              color: "#fff",
              padding: 14,
              borderRadius: 16,
            }}
          />

          <Pressable
            onPress={() => {
              onSave(Number(balance || 0));
              onClose();
            }}
            style={{
              marginTop: 16,
              backgroundColor: Colors.primary,
              padding: 16,
              borderRadius: 18,
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              Save
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}