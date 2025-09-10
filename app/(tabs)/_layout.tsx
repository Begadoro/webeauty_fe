import { Tabs } from "expo-router";
import { Book, Store, User, Home } from "lucide-react-native";
import colors from "~/constants/colors";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Home
              color={
                focused
                  ? colors.purpleLight
                  : isDarkColorScheme
                    ? colors.white
                    : colors.black
              }
            />
          ),
          tabBarActiveTintColor: colors.purpleLight,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Negozi",
          tabBarIcon: ({ focused }) => (
            <Store
              color={
                focused
                  ? colors.purpleLight
                  : isDarkColorScheme
                    ? colors.white
                    : colors.black
              }
            />
          ),
          tabBarActiveTintColor: colors.purpleLight,
        }}
      />
      <Tabs.Screen
        name="bookings"
        options={{
          title: "Appuntamenti",
          tabBarIcon: ({ focused }) => (
            <Book
              color={
                focused
                  ? colors.purpleLight
                  : isDarkColorScheme
                    ? colors.white
                    : colors.black
              }
            />
          ),
          tabBarActiveTintColor: colors.purpleLight,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profilo",
          tabBarIcon: ({ focused }) => (
            <User
              color={
                focused
                  ? colors.purpleLight
                  : isDarkColorScheme
                    ? colors.white
                    : colors.black
              }
            />
          ),
          tabBarActiveTintColor: colors.purpleLight,
        }}
      />
    </Tabs>
  );
}
