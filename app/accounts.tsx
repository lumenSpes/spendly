import { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";

import { Colors } from "../src/theme/colors";

import AccountCard from "../src/components/ui/AccountCard";
import AddAccountModal from "../src/components/ui/AddAccountModal";
import EditBalanceModal from "../src/components/ui/EditBalanceModal";

import {
  getAccounts,
  createAccount,
  deleteAccount,
  updateBalance,
} from "../src/db/accountQueries";

import { useAccountStore } from "../src/store/useAccountStore";

export default function AccountsScreen() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { accounts, setAccounts, addAccount } =
    useAccountStore();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getAccounts();
    setAccounts(data);
  }

  async function handleSave(values: any) {
    const payload = {
      id: Date.now().toString(),
      ...values,
      createdAt: new Date().toISOString(),
    };

    await createAccount(payload);
    addAccount(payload);
  }

  async function handleDelete(id: string) {
    await deleteAccount(id);
    load();
  }

  async function handleEdit(item: any) {
    setSelected(item);
    setEditOpen(true);
  }

  async function saveBalance(value: number) {
    await updateBalance(selected.id, value);
    load();
  }

  const total = useMemo(() => {
    return accounts.reduce(
      (sum, a) => sum + Number(a.balance || 0),
      0
    );
  }, [accounts]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        padding: 20,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: 28,
          fontWeight: "700",
        }}
      >
        Accounts
      </Text>

      <View
        style={{
          marginTop: 18,
          backgroundColor: Colors.primary,
          padding: 22,
          borderRadius: 26,
        }}
      >
        <Text style={{ color: "#E0E7FF" }}>
          Total Assets
        </Text>

        <Text
          style={{
            color: "#fff",
            fontSize: 34,
            fontWeight: "800",
            marginTop: 10,
          }}
        >
          ৳ {total.toFixed(2)}
        </Text>
      </View>

      <Pressable
        onPress={() => setOpen(true)}
        style={{
          marginTop: 16,
          backgroundColor: Colors.card,
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
          + Add Account
        </Text>
      </Pressable>

      <FlatList
        data={accounts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingTop: 18,
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <AccountCard
            item={item}
            onEdit={(row: any) =>
              Alert.alert(
                row.name,
                "Choose Action",
                [
                  {
                    text: "Edit Balance",
                    onPress: () => handleEdit(row),
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () =>
                      handleDelete(row.id),
                  },
                  { text: "Cancel" },
                ]
              )
            }
          />
        )}
      />

      <AddAccountModal
        visible={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />

      <EditBalanceModal
        visible={editOpen}
        account={selected}
        onClose={() => setEditOpen(false)}
        onSave={saveBalance}
      />
    </View>
  );
}