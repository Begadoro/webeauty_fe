import { ShoppingCart } from "lucide-react-native";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import colors from "~/constants/colors";
import { P } from "~/components/ui/typography";
import { useCartStore } from "~/hooks/useCartStore";
import {router} from "expo-router";
import {routes} from "~/constants/routes";

export function CartFab() {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const cartStore = useCartStore();

  useEffect(() => {
    if (cartStore.items.length > 0) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [cartStore.items]);

  return (
    <Animated.View
      className="absolute right-5"
      style={{ transform: [{ scale: scaleAnim }], bottom: insets.bottom + 20 }}
    >
      <TouchableOpacity
        className="w-20 h-20 gap-0 rounded-full bg-purplePrimary shadow items-center justify-center"
        onPress={() => router.push(routes.CART)}
      >
        <ShoppingCart color={colors.white} size={24} />
      </TouchableOpacity>
    </Animated.View>
  );
}
