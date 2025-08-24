import { View } from "react-native";
import { P } from "~/components/ui/typography";
import { Image } from "expo-image";
import { cn } from "~/lib/utils";

const icons = {
  hair: require("../assets/icons/hairdryer.svg"),
  nails: require("../assets/icons/nails.svg"),
};

const colors = {
  hair: { text: "text-purpleLight", border: "border-purpleLight" },
  nails: { text: "text-lime", border: "border-lime" },
};

const labels = {
  hair: "Capelli",
  nails: "Unghie",
};

function Icon({ type }: { type: keyof typeof icons }) {
  return <Image source={icons[type]} style={{ width: 20, height: 20 }} />;
}

export default function Tag({ type }: { type: keyof typeof icons }) {
  return (
    <View
      className={cn(
        "flex-row items-center gap-2 rounded-full px-2 py-1 self-start border",
        colors[type].border,
      )}
    >
      <Icon type={type} />
      <P className={colors[type].text}>{labels[type]}</P>
    </View>
  );
}
