import { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import { Colors } from "../../src/theme/colors";
import {
  expenseCategories,
  incomeCategories,
} from "../../src/constants/categories";

import { useAccountStore } from "../../src/store/useAccountStore";
import { useTransactionStore } from "../../src/store/useTransactionStore";

import {
  createTransaction,
  updateAccountBalance,
} from "../../src/db/transactionQueries";

export default function AddScreen() {
  const { accounts } = useAccountStore();
  const { addTransaction } = useTransactionStore();

  const [type, setType] =
    useState<"income" | "expense">("expense");

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("Food");

  const firstAccount = accounts[0]?.id || "";
  const [accountId, setAccountId] =
    useState(firstAccount);

  const categories = useMemo(
    () =>
      type === "expense"
        ? expenseCategories
        : incomeCategories,
    [type]
  );

  async function save() {
    if (!amount || Number(amount) <= 0) {
      Alert.alert("Enter valid amount");
      return;
    }

    if (!accountId) {
      Alert.alert("Create an account first");
      return;
    }

    const payload = {
      id: Date.now().toString(),
      type,
      amount: Number(amount),
      category,
      note,
      accountId,
      categoryId: category,
      date: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await createTransaction(payload);
    await updateAccountBalance(
      accountId,
      Number(amount),
      type
    );

    addTransaction(payload);

    setAmount("");
    setNote("");

    Alert.alert("Saved successfully");
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 60,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Add Transaction
      </Text>

      {/* Type Toggle */}
      <View
        style={{
          flexDirection: "row",
          marginTop: 18,
          backgroundColor: Colors.card,
          padding: 6,
          borderRadius: 18,
        }}
      >
        {["expense", "income"].map((item) => (
          <Pressable
            key={item}
            onPress={() => setType(item as any)}
            style={{
              flex: 1,
              padding: 14,
              borderRadius: 14,
              backgroundColor:
                type === item
                  ? item === "expense"
                    ? Colors.expense
                    : Colors.income
                  : "transparent",
            }}
          >
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              {item.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Amount */}
      <TextInput
        placeholder="0.00"
        placeholderTextColor="#64748B"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={{
          marginTop: 18,
          backgroundColor: Colors.card,
          color: "#fff",
          fontSize: 32,
          fontWeight: "700",
          padding: 20,
          borderRadius: 22,
        }}
      />

      {/* Category */}
      <Text
        style={{
          color: "#94A3B8",
          marginTop: 18,
          marginBottom: 10,
        }}
      >
        Category
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((item) => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              borderRadius: 16,
              marginRight: 10,
              backgroundColor:
                category === item
                  ? Colors.primary
                  : Colors.card,
            }}
          >
            <Text style={{ color: "#fff" }}>{item}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Accounts */}
      <Text
        style={{
          color: "#94A3B8",
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Account
      </Text>

      {accounts.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => setAccountId(item.id)}
          style={{
            padding: 16,
            borderRadius: 18,
            marginBottom: 10,
            backgroundColor:
              accountId === item.id
                ? Colors.primary
                : Colors.card,
          }}
        >
          <Text style={{ color: "#fff" }}>
            {item.name} • ৳ {Number(item.balance).toFixed(2)}
          </Text>
        </Pressable>
      ))}

      {/* Note */}
      <TextInput
        placeholder="Note (optional)"
        placeholderTextColor="#64748B"
        value={note}
        onChangeText={setNote}
        style={{
          marginTop: 18,
          backgroundColor: Colors.card,
          color: "#fff",
          padding: 16,
          borderRadius: 18,
        }}
      />

      {/* Save */}
      <Pressable
        onPress={save}
        style={{
          marginTop: 22,
          backgroundColor: Colors.primary,
          padding: 18,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
          }}
        >
          Save Transaction
        </Text>
      </Pressable>
    </ScrollView>
  );
}