import { useWindowDimensions, View } from "react-native";
import { Image } from "expo-image";
import { H1, H2, H3, Lead } from "~/components/ui/typography";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { i18n } from "~/i18n";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLoader } from "~/hooks/useLoader";
import { useToast } from "~/hooks/useToast";
import { useRouter } from "expo-router";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react-native";
import StandardScreen from "~/components/StandardScreen";
import { routes } from "~/constants/routes";

export default function Login() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <StandardScreen>
      <Image
        source={require("assets/images/login-bg.jpg")}
        style={{ width, height, position: "absolute" }}
        contentFit="cover"
      />
      <Button
        variant="link"
        className="absolute z-30"
        onPress={() => router.push(routes.REGISTER)}
        style={{ top: insets.top + 10, right: insets.right }}
      >
        <Text className="text-white">{i18n.t("login.signUp")}</Text>
      </Button>
      <KeyboardAwareScrollView
        contentContainerClassName="flex-1 justify-center items-start p-6 gap-10"
        enableOnAndroid={true}
        extraScrollHeight={80}
      >
        <LoginForm />
      </KeyboardAwareScrollView>
    </StandardScreen>
  );
}

const zLogin = z.object({
  email: z.email(i18n.t("errors.invalidEmail")),
  password: z.string().min(1, i18n.t("errors.passwordRequired")),
});

export type LoginFormData = z.infer<typeof zLogin>;

function LoginForm() {
  const loader = useLoader();
  const toast = useToast();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(zLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    loader.show();
    setTimeout(() => {
      loader.hide();
      router.replace(routes.HOME);
    }, 3000);
  };

  useEffect(() => {
    if (errors.email || errors.password) {
      toast.error(errors);
    }
  }, [errors]);

  return (
    <>
      <View>
        <H1 className="text-white text-7xl">{i18n.t("login.title")}</H1>
        <Lead className="text-white">{i18n.t("login.subtitle")}</Lead>
      </View>
      <View className="w-full gap-2">
        <H3 className="text-white mb-2">{i18n.t("login.loginAccount")}</H3>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              invalid={!!errors.email}
              className="w-full"
              placeholder={i18n.t("login.email")}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              spellCheck={false}
              keyboardType="email-address"
              LeftIcon={Mail}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              invalid={!!errors.password}
              className="w-full"
              placeholder={i18n.t("login.password")}
              secureTextEntry={showPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              LeftIcon={Lock}
              RightIcon={showPassword ? Eye : EyeOff}
              onRightIconPress={() => setShowPassword(!showPassword)}
            />
          )}
        />
        <Button
          className="mt-2 bg-purplePrimary"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="font-bold text-white">{i18n.t("login.login")}</Text>
        </Button>
        <Button variant="link">
          <Text className="underline text-white">
            {i18n.t("login.recoverPassword")}
          </Text>
        </Button>
      </View>
    </>
  );
}
