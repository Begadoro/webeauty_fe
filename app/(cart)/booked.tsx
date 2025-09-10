import { useWindowDimensions, View } from "react-native";
import StandardScreen from "~/components/StandardScreen";
import { Image } from "expo-image";
import { H2, H4, P } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import { useRouter } from "expo-router";
import { routes } from "~/constants/routes";
import React from "react";

export default function BookedScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  return (
    <StandardScreen>
      <Image
        source={require("assets/images/register-bg.png")}
        style={{ width, height, position: "absolute" }}
        contentFit="cover"
      />
      <View className="flex-1 items-center justify-center p-6 gap-4">
        <View className="items-center justify-center gap-2">
          <Image
            source={require("../../assets/icons/confetti.gif")}
            style={{ width: 100, height: 100 }}
          />
          <H2 className="text-center text-white">Richiesta inviata!</H2>
          <P className="text-center text-white">
            Puoi controllare lo stato della tua prenotazione nella sezione
            "Prenotazioni" o tramite gli aggiornamenti inviati per email!
          </P>
        </View>
        <Button
          variant="ghost"
          className="w-full"
          onPress={() => router.replace(routes.HOME)}
        >
          <P className="text-white font-bold">Torna alla home</P>
        </Button>
      </View>
    </StandardScreen>
  );
}
