import { Image } from "expo-image";
import { i18n } from "~/i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWindowDimensions, View } from "react-native";
import { H1, H3, Lead } from "~/components/ui/typography";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";

import { useState } from "react";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BadgeCheck } from "lucide-react-native";
import colors from "tailwindcss/colors";
import { useRouter } from "expo-router";
import { useLoader } from "~/hooks/useLoader";
import StandardScreen from "~/components/StandardScreen";
import CollapsibleScreen from "~/components/CollapsibleScreen";

export default function Register() {
  const { width, height } = useWindowDimensions();
  const loader = useLoader();
  const [step, setStep] = useState<0 | 1>(0);
  const onSubmit = () => {
    loader.show();
    setTimeout(() => {
      loader.hide();
      setStep(1);
    }, 5000);
  };
  return (
    <CollapsibleScreen type={2} headerClassName="bg-transparent">
      <Image
        source={require("assets/images/register-bg.png")}
        style={{ width, height, position: "absolute" }}
        contentFit="cover"
      />
      <KeyboardAwareScrollView
        contentContainerClassName="flex-1 justify-center items-start p-6 gap-10"
        enableOnAndroid={true}
        extraScrollHeight={80}
      >
        {step === 0 && <Form onSubmit={onSubmit} />}
        {step === 1 && <Complete />}
      </KeyboardAwareScrollView>
    </CollapsibleScreen>
  );
}

function Form({ onSubmit }: { onSubmit?: () => void }) {
  const router = useRouter();
  return (
    <>
      <View>
        <H1 className="text-white mb-2">{i18n.t("register.title")}</H1>
        <Lead className="text-white mb-2">{i18n.t("register.subtitle")}</Lead>
      </View>
      <View className="w-full gap-2">
        <Input className="w-full" placeholder={i18n.t("register.firstName")} />
        <Input className="w-full" placeholder={i18n.t("register.lastName")} />
        <Input className="w-full" placeholder={i18n.t("register.email")} />
        <Input className="w-full" placeholder={i18n.t("register.password")} />
        <Input
          className="w-full"
          placeholder={i18n.t("register.passwordConfirm")}
        />
        <Button className="mt-2 bg-purplePrimary" onPress={onSubmit}>
          <Text className="font-bold text-white">
            {i18n.t("register.next")}
          </Text>
        </Button>
      </View>
    </>
  );
}

function Complete() {
  const router = useRouter();
  return (
    <>
      <View className="w-full">
        <View className="w-full flex justify-center items-center mb-4">
          <BadgeCheck size={96} color={colors.white} />
        </View>
        <H1 className="text-white mb-2">
          {i18n.t("register.registerCompletedTitle")}
        </H1>
        <Lead className="text-white mb-2">
          {i18n.t("register.registerCompletedSubtitle")}
        </Lead>
        <Button className="mt-2 bg-purplePrimary" onPress={router.back}>
          <Text className="font-bold text-white">
            {i18n.t("register.backToLogin")}
          </Text>
        </Button>
      </View>
    </>
  );
}
