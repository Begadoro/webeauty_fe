import StandardScreen from "~/components/StandardScreen";
import { H2, H3, H4, P } from "~/components/ui/typography";
import { TouchableOpacity, View } from "react-native";
import { Card } from "~/components/ui/card";
import { ComponentType } from "react";
import colors from "~/constants/colors";
import { useColorScheme } from "~/lib/useColorScheme";
import {
  Bell,
  CircleUserRound,
  KeyRound,
  LogOut,
  Palette,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { InternalRoute, routes } from "~/constants/routes";
import CollapsibleScreen from "~/components/CollapsibleScreen";

type MenuItem = {
  text: string;
  route: InternalRoute;
  Icon: ComponentType<any>;
};

const menuItems: MenuItem[] = [
  { text: "Dati personali", route: routes.NOT_FOUND, Icon: CircleUserRound },
  { text: "Privacy e sicurezza", route: routes.NOT_FOUND, Icon: KeyRound },
  { text: "Notifiche", route: routes.NOT_FOUND, Icon: Bell },
  { text: "Aspetto", route: routes.CUSTOMIZATION, Icon: Palette },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <CollapsibleScreen title="Profilo" type={1} onBack={router.back}>
      <View className="flex-1 p-6 gap-1">
        {menuItems.map((item, index) => (
          <MenuCard
            key={index}
            text={item.text}
            route={item.route}
            Icon={item.Icon}
          />
        ))}
        <TouchableOpacity onPress={() => router.replace(routes.LOGIN)}>
          <Card className="flex-row w-full gap-4 p-4 items-center bg-card mb-2 border-errorDark">
            <LogOut size={24} color={colors.errorDark} />
            <P className="text-lg text-errorDark">Esci</P>
          </Card>
        </TouchableOpacity>
      </View>
    </CollapsibleScreen>
  );
}

function MenuCard({ text, route, Icon }: MenuItem) {
  const isDark = useColorScheme().isDarkColorScheme;
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(route)}>
      <Card className="flex-row w-full gap-4 p-4 items-center bg-card mb-2">
        <Icon size={24} color={isDark ? colors.white : colors.black} />
        <P className="text-lg">{text}</P>
      </Card>
    </TouchableOpacity>
  );
}
