import { Animated, StatusBar, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { ReactNode } from "react";
import { useColorScheme } from "~/lib/useColorScheme";

export default function StandardScreen({ children }: { children: ReactNode }) {
  const isDark = useColorScheme().isDarkColorScheme;
  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <View className="flex-1 ">{children}</View>
    </SafeAreaView>
  );
}
