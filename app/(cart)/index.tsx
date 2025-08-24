import CollapsibleScreen from "~/components/CollapsibleScreen";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {useCartStore} from "~/hooks/useCartStore";
import {TreatmentRow} from "~/components/TreatmentRow";
import {H4, P} from "~/components/ui/typography";
import {Separator} from "~/components/ui/separator";
import { BrushCleaning } from "lucide-react-native";
import colors from "~/constants/colors";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {timesMockup} from "~/constants/mockup";
import {Badge} from "~/components/ui/badge";
import {Card} from "~/components/ui/card";

export default function CartScreen(){
  const cartStore = useCartStore();
  const [step, setStep] = useState(0);
  return (
      <CollapsibleScreen type={1} title={"Carrello"}>
        {cartStore.items.length > 0 ? (
            <>
              {step === 0 && <Treatments setStep={setStep}/>}
              {step === 1 && <DateTimeSelect setStep={setStep}/>}
            </>
        ) : (
            <View className="flex-col items-center gap-2 w-full py-10">
              <BrushCleaning color={colors.purpleLight} size={48}/>
              <H4 className="text-center">Carrello vuoto</H4>
              <P className="text-center">Torna indietro e seleziona qualche trattamento per continuare!</P>
            </View>
        )}
      </CollapsibleScreen>
  )
}

function Treatments({ setStep } : { setStep: (step: number) => void }){
  const cartStore = useCartStore();
  return (
      <ScrollView className="p-6" contentContainerClassName="gap-4">
        <View className="gap-1">
          <H4>Trattamenti selezionati</H4>
          {cartStore.items.map((item, index) => (<TreatmentRow treatment={item} key={index} />))}
        </View>
        <Separator />
        <Button className="bg-purplePrimary" onPress={() => setStep(1)}>
          <P className="text-white font-bold">Avanti</P>
        </Button>
      </ScrollView>
  )
}

function DateTimeSelect({ setStep } : { setStep: (step: number) => void }){
  return (
    <ScrollView className="p-6" contentContainerClassName="gap-4">
      <View className="gap-2">
        <H4>Seleziona un giorno</H4>
        <View className="flex-row flex-wrap">
          {timesMockup.map((item, index) => (
              <TouchableOpacity key={index} className="basis-1/5 p-1">
                <Card className="w-fit p-2 items-center">
                  <P>{item}</P>
                </Card>
              </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="gap-2">
        <H4>Seleziona un orario</H4>
        <View className="flex-row flex-wrap">
          {timesMockup.map((item, index) => (
              <TouchableOpacity key={index} className="basis-1/5 p-1">
                <Card className="w-fit p-2 items-center">
                  <P>{item}</P>
                </Card>
              </TouchableOpacity>
          ))}
        </View>
      </View>
      <Separator />
      <Button className="bg-purplePrimary" onPress={() => setStep(2)}>
        <P className="text-white font-bold">Avanti</P>
      </Button>
      <Button variant="outline" onPress={() => setStep(0)}>
        <P className="font-bold">Indietro</P>
      </Button>
    </ScrollView>)
}