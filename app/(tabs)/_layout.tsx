import { Tabs } from "expo-router";
import {Book, Store, User} from "lucide-react-native";
import colors from "~/constants/colors";
import { useColorScheme } from "~/lib/useColorScheme";

export default function TabLayout() {
  const { isDarkColorScheme } = useColorScheme();
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="shops"
        options={{
          title: "Negozi",
          tabBarIcon: ({ focused }) => (
            <Store
              color={
                focused
                  ? colors.purplePrimary
                  : isDarkColorScheme
                    ? colors.white
                    : colors.black
              }
            />
          ),
          tabBarActiveTintColor: colors.purplePrimary,
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
                  ? colors.purplePrimary
                  : isDarkColorScheme
                    ? colors.white
                    : colors.black
              }
            />
          ),
          tabBarActiveTintColor: colors.purplePrimary,
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
                          ? colors.purplePrimary
                          : isDarkColorScheme
                              ? colors.white
                              : colors.black
                    }
                />
            ),
            tabBarActiveTintColor: colors.purplePrimary,
          }}
      />
    </Tabs>
  );
}
