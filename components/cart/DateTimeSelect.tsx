import { useState } from "react";
import { useLocales } from "expo-localization";
import { useLoader } from "~/hooks/useLoader";
import { DatePicker } from "~/components/DatePicker";
import { TouchableOpacity, View } from "react-native";
import { H4, P } from "~/components/ui/typography";
import { Card } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { timesMockup } from "~/constants/mockup";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Toggle } from "~/components/ui/toggle";

export function DateTimeSelect({
  setStep,
  date,
  setDate,
  time,
  setTime,
}: {
  setStep: (step: number) => void;
  date: Date;
  setDate: (date: Date) => void;
  time: string;
  setTime: (time: string) => void;
}) {
  const [openPicker, setOpenPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const locale = useLocales()[0].languageTag;
  const loader = useLoader();

  function onDatePick() {
    loader.show();
    setLoading(true);

    setTimeout(() => {
      loader.hide();
      setLoading(false);
      setTime("");
    }, 2000);
  }
  return (
    <>
      <DatePicker
        open={openPicker}
        close={() => setOpenPicker(false)}
        value={date}
        setValue={setDate}
        minDate={new Date()}
        onPick={onDatePick}
      />
      <View className="p-6 h-full gap-4">
        <View className="gap-2">
          <H4>Seleziona un giorno</H4>
          <View className="flex-row flex-wrap">
            <TouchableOpacity
              className="w-full"
              onPress={() => setOpenPicker(true)}
            >
              <Card className="w-full p-2 items-center border-transparent bg-accent">
                <P>
                  {date.toLocaleDateString(locale, {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </P>
              </Card>
            </TouchableOpacity>
          </View>
        </View>
        <Separator />
        <View className="gap-2">
          <H4>Seleziona un orario</H4>
          {loading && <Skeleton className="w-full h-52" />}
          {!loading && (
            <View className="flex-row flex-wrap">
              {timesMockup.map((item, index) => (
                <Toggle
                  key={index}
                  className="basis-1/5 p-1"
                  pressed={time === item}
                  onPressedChange={() => setTime(item)}
                >
                  <P>{item}</P>
                </Toggle>
              ))}
            </View>
          )}
        </View>
        <Separator />
        <Button
          className="bg-purplePrimary"
          onPress={() => setStep(2)}
          disabled={!time || !date}
        >
          <P className="text-white font-bold">Avanti</P>
        </Button>
        <Button variant="outline" onPress={() => setStep(0)}>
          <P className="font-bold">Indietro</P>
        </Button>
      </View>
    </>
  );
}
