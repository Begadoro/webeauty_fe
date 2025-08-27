import { ScrollView, View } from "react-native";
import { H3, H4, P } from "../ui/typography";
import { useCartStore } from "~/hooks/useCartStore";
import { TreatmentRow } from "~/components/TreatmentRow";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { PaymentMethod } from "~/constants/types";
import { useLocales } from "expo-localization";
import { MockupShop } from "~/constants/mockup";
import { Card } from "../ui/card";
import { Info } from "lucide-react-native";
import colors from "~/constants/colors";

export function Recap({
  setStep,
  dateTime,
  payment,
  onBookTreatment,
}: {
  setStep: (step: number) => void;
  dateTime: Date;
  payment: PaymentMethod;
  onBookTreatment: () => void;
}) {
  const cartStore = useCartStore();
  const locale = useLocales()[0].languageTag;

  return (
    <ScrollView
      className="p-6 h-full"
      contentContainerClassName="gap-4"
      showsVerticalScrollIndicator={false}
    >
      <H3 className="font-bold">
        Riepilogo prenotazione presso{" "}
        <H3 className="text-purpleLight font-extrabold">
          {cartStore.shopName}
        </H3>
      </H3>
      <View className="gap-1">
        <H4>Trattamenti</H4>
        {cartStore.items.map((item, index) => (
          <TreatmentRow treatment={item} key={index} notEditable />
        ))}
      </View>
      <Separator />
      <View className="gap-1">
        <H4>Data</H4>
        <P>
          {dateTime.toLocaleDateString(locale, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
          })}
        </P>
      </View>
      <Separator />
      <View className="gap-1">
        <H4>Durata totale</H4>
        <P>
          {cartStore.items.reduce((acc, item) => acc + item.time, 0)} minuti
        </P>
      </View>
      <Separator />
      <View className="gap-1">
        <H4>Pagamento</H4>
        <P>
          {payment === PaymentMethod.CASH
            ? "Contanti"
            : "Carta di credito o debito"}
        </P>
      </View>
      <Separator />
      <View className="gap-1">
        <H4>Totale dovuto alla cassa</H4>
        <P>{cartStore.total} €</P>
      </View>
      <Separator />
      <Card className="border-transparent p-4 flex-col bg-purpleExtraLight gap-2 justify-center items-center">
        <Info color={colors.purpleDark} />
        <P className="text-purpleDark text-center">
          Una volta inviata la richiesta dovrai attendere la conferma da parte
          dell'esercente per poter considerare valida la prenotazione.
        </P>
      </Card>
      <Button className="bg-purplePrimary" onPress={onBookTreatment}>
        <P className="text-white font-bold">Prenota</P>
      </Button>
      <Button variant="outline" onPress={() => setStep(2)}>
        <P className="font-bold">Indietro</P>
      </Button>
    </ScrollView>
  );
}
