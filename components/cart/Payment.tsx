import { H3, H4, P } from "~/components/ui/typography";
import { ScrollView, View } from "react-native";
import { Toggle } from "../ui/toggle";
import { PaymentMethod } from "~/constants/types";
import { Separator } from "../ui/separator";
import { Button } from "~/components/ui/button";
import { Banknote, Landmark, Mail } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import colors from "~/constants/colors";
import { useCartStore } from "~/hooks/useCartStore";
import { i18n } from "~/i18n";
import { Input } from "~/components/ui/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export function Payment({
  setStep,
  payment,
  setPayment,
}: {
  setStep: (step: number) => void;
  payment: PaymentMethod;
  setPayment: (payment: PaymentMethod) => void;
}) {
  const { isDarkColorScheme } = useColorScheme();
  const cartStore = useCartStore();

  return (
    <KeyboardAwareScrollView
      className="p-6 h-full"
      contentContainerClassName="gap-4"
    >
      <View className="gap-4">
        <View className="gap-2">
          <H4>Seleziona un metodo di pagamento</H4>
          <P className="text-gray leading-none">
            Pagherai direttamente in struttura, non devi versare nessun importo
            al momento della prenotazione!
          </P>
        </View>

        <View className="flex-row gap-2">
          <Toggle
            className="flex-1 p-6 h-44 flex-col"
            pressed={payment === PaymentMethod.CASH}
            onPressedChange={() => setPayment(PaymentMethod.CASH)}
          >
            <Banknote
              size={32}
              color={isDarkColorScheme ? colors.white : colors.black}
            />
            <P>Contanti</P>
          </Toggle>
          <Toggle
            className="flex-1 h-44 p-6 flex-col"
            pressed={payment === PaymentMethod.CREDIT_CARD}
            onPressedChange={() => setPayment(PaymentMethod.CREDIT_CARD)}
          >
            <Landmark
              size={32}
              color={isDarkColorScheme ? colors.white : colors.black}
            />
            <P className="text-center">Carta di credito o debito</P>
          </Toggle>
        </View>
      </View>
      <Separator />
      <View className="gap-2">
        <H4>Coupon</H4>
        <P className="text-gray leading-none">
          Se hai un codice sconto inseriscilo qui per applicarlo alla tua
          prenotazione!
        </P>

        <View className="flex-row gap-2">
          <Input
            className="flex-1"
            autoCapitalize="none"
            placeholder="Inserisci coupon"
          />
          <Button
            className="w-1/4 bg-purplePrimary"
            onPress={() => cartStore.setDiscount(10)}
          >
            <P className="text-white">Applica</P>
          </Button>
        </View>
      </View>
      <Separator />
      <View>
        <P>Subtotale: {cartStore.subTotal} €</P>
        {cartStore.discount > 0 && (
          <P>Sconti applicati: -{cartStore.discount}€ (APP10)</P>
        )}
        <H4 className="font-extrabold">Totale: {cartStore.total} €</H4>
      </View>
      <Button className="bg-purplePrimary" onPress={() => setStep(3)}>
        <P className="text-white font-bold">Avanti</P>
      </Button>
      <Button variant="outline" onPress={() => setStep(1)}>
        <P className="font-bold">Indietro</P>
      </Button>
    </KeyboardAwareScrollView>
  );
}
