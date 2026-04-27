import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import { Colors } from "../../theme/colors";

export default function AddAccountModal({
  visible,
  onClose,
  onSave,
}: any) {
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [type, setType] = useState("cash");

  return (
    <Modal visible={visible} animationType="slide" transparent>
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
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700" }}>
            Add Account
          </Text>

          <TextInput
            placeholder="Account Name"
            placeholderTextColor="#64748B"
            value={name}
            onChangeText={setName}
            style={{
              marginTop: 16,
              backgroundColor: Colors.soft,
              color: "#fff",
              padding: 14,
              borderRadius: 14,
            }}
          />

          <TextInput
            placeholder="Opening Balance"
            placeholderTextColor="#64748B"
            keyboardType="numeric"
            value={balance}
            onChangeText={setBalance}
            style={{
              marginTop: 12,
              backgroundColor: Colors.soft,
              color: "#fff",
              padding: 14,
              borderRadius: 14,
            }}
          />

          <Pressable
            onPress={() => {
              onSave({
                name,
                balance: Number(balance || 0),
                type,
              });

              setName("");
              setBalance("");
              onClose();
            }}
            style={{
              marginTop: 18,
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
              Save Account
            </Text>
          </Pressable>

          <Pressable onPress={onClose}>
            <Text
              style={{
                color: "#94A3B8",
                textAlign: "center",
                marginTop: 14,
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}