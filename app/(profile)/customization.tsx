import StandardScreen from "~/components/StandardScreen";
import { View } from "react-native";
import { H2, P } from "~/components/ui/typography";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { useColorScheme } from "~/lib/useColorScheme";
import { Switch } from "~/components/ui/switch";
import CollapsibleScreen from "~/components/CollapsibleScreen";

export default function CustomizationScreen() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();

  function toggleColorScheme() {
    const newTheme = isDarkColorScheme ? "light" : "dark";
    setColorScheme(newTheme);
    setAndroidNavigationBar(newTheme);
  }

  return (
    <CollapsibleScreen type={1} title="Aspetto">
      <View className="flex-1 p-6 gap-1">
        <View className="flex-col gap-4">
          <View className="flex-row items-center justify-between">
            <P className="text-lg">Modalità scura</P>
            <Switch
              checked={isDarkColorScheme}
              onCheckedChange={toggleColorScheme}
            />
          </View>
        </View>
      </View>
    </CollapsibleScreen>
  );
}
