import { Tabs } from "expo-router";
import { Home, Wallet, Plus, PieChart, Settings } from "lucide-react-native";
import { Colors } from "../../src/theme/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 0,
          height: 70,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: ({color}) => <Home color={color}/> }} />
      <Tabs.Screen name="transactions" options={{ title: "History", tabBarIcon: ({color}) => <Wallet color={color}/> }} />
      <Tabs.Screen name="add" options={{ title: "Add", tabBarIcon: ({color}) => <Plus color={color}/> }} />
      <Tabs.Screen name="budgets" options={{ title: "Budgets", tabBarIcon: ({color}) => <PieChart color={color}/> }} />
      <Tabs.Screen name="settings" options={{ title: "Settings", tabBarIcon: ({color}) => <Settings color={color}/> }} />
    </Tabs>
  );
}