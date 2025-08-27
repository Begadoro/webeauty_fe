import { useCartStore } from "~/hooks/useCartStore";
import { ScrollView, View } from "react-native";
import { H4, P } from "~/components/ui/typography";
import { TreatmentRow } from "~/components/TreatmentRow";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";

export function Treatments({ setStep }: { setStep: (step: number) => void }) {
  const cartStore = useCartStore();
  return (
    <ScrollView className="p-6 h-full" contentContainerClassName="gap-4">
      <View className="gap-1">
        <H4>Trattamenti selezionati</H4>
        {cartStore.items.map((item, index) => (
          <TreatmentRow treatment={item} key={index} />
        ))}
      </View>
      <Separator />
      <Button className="bg-purplePrimary" onPress={() => setStep(1)}>
        <P className="text-white font-bold">Avanti</P>
      </Button>
    </ScrollView>
  );
}
