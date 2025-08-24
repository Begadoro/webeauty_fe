import { MockupTreatment } from "~/constants/mockup";
import { TouchableOpacity, View } from "react-native";
import { P } from "~/components/ui/typography";
import {CircleCheck, CirclePlus, Timer } from "lucide-react-native";
import colors from "~/constants/colors";
import { useCartStore } from "~/hooks/useCartStore";
import { useMemo } from "react";
import {cn} from "~/lib/utils";

export function TreatmentRow({
  treatment,
  onPress,
}: {
  treatment: MockupTreatment;
  onPress?: () => void;
}) {
  const cartStore = useCartStore();
  const isInCart = useMemo(
    () => cartStore.items.some((tr) => tr.id === treatment.id),
    [cartStore.items],
  );

  function thisOnPress() {
    if (isInCart) {
      cartStore.removeItem(treatment);
    } else {
      cartStore.addItem(treatment);
    }
    onPress && onPress();
  }

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-col gap-0 w-3/4">
        <P className="leading-2">{treatment.name}</P>
        <P className="leading-none text-gray">{treatment.description}</P>
        <View className="flex-row gap-0.5 items-center">
          <Timer color={colors.purpleLight} size={12} />
          <P className="leading-none text-gray text-sm">{treatment.time} min</P>
        </View>
      </View>
      <TouchableOpacity
        className="flex-row items-center gap-2 w-1/4 justify-end"
        onPress={thisOnPress}
      >
        <P className={cn("font-bold text-purpleLight", isInCart && "text-green")}>{treatment.price}€</P>
        {isInCart ? <CircleCheck color={colors.green} /> : <CirclePlus color={colors.purpleLight} />}
      </TouchableOpacity>
    </View>
  );
}
