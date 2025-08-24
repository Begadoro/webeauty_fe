// CollapsibleScreen.tsx
import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { cn } from "~/lib/utils";
import { H1, P } from "~/components/ui/typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Text } from "~/components/ui/text";
import { useRouter } from "expo-router";
import { routes } from "~/constants/routes";
import { ChevronLeft } from "lucide-react-native";
import { useColorScheme } from "~/lib/useColorScheme";
import { Skeleton } from "~/components/ui/skeleton";
import AnimatedInterpolation = Animated.AnimatedInterpolation;

type Props = {
  image?: ImageSourcePropType;
  headerMinHeight?: number;
  titleClassName?: string;
  headerClassName?: string;
  type?: 0 | 1 | 2;
  goBackDark?: boolean;
  title?: string;
  children: React.ReactNode;
  loading?: boolean;
  collapsible?: boolean;
  showTitleOnEndScroll?: boolean;
  HeaderContent?: React.ReactNode;
};

export default function CollapsibleScreen({
  image,
  headerMinHeight = 50,
  titleClassName,
  headerClassName,
  type,
  goBackDark,
  title,
  children,
  loading = false,
  collapsible = false,
  showTitleOnEndScroll = false,
  HeaderContent,
}: Props) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { isDarkColorScheme } = useColorScheme();

  // Track dynamic header height
  const [headerContentHeight, setHeaderContentHeight] = useState(0);

  const HEADER_SCROLL_DISTANCE = Math.max(
    headerContentHeight - headerMinHeight,
    0,
  );

  // Header height animation
  const headerHeight =
    collapsible && headerContentHeight
      ? scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [headerContentHeight, headerMinHeight + insets.top],
          extrapolate: "clamp",
        })
      : undefined;

  // Title opacity and slide animation
  const titleOpacity = showTitleOnEndScroll
    ? scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE * 0.8, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0.5, 1],
        extrapolate: "clamp",
      })
    : 1;

  const titleTranslateY = showTitleOnEndScroll
    ? scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [-20, 0],
        extrapolate: "clamp",
      })
    : 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["left", "right"]}>
      <StatusBar style={isDarkColorScheme || image ? "light" : "dark"} />
      {collapsible ? (
        <KeyboardAwareScrollView
          contentContainerStyle={{
            paddingTop: headerContentHeight,
            paddingBottom: insets.bottom,
          }}
          scrollEventThrottle={16}
          extraScrollHeight={20}
          showsVerticalScrollIndicator={false}
          onScroll={
            collapsible
              ? Animated.event(
                  [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                  { useNativeDriver: false },
                )
              : undefined
          }
        >
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          className="flex-1"
          style={{
            paddingTop: headerMinHeight + insets.top,
            paddingBottom: insets.bottom,
          }}
        >
          {children}
        </View>
      )}

      {/* Header */}
      <Animated.View
        style={{ height: headerHeight }}
        className={cn(
          "absolute top-0 left-0 right-0 overflow-hidden bg-card",
          headerClassName,
        )}
      >
        {image && !loading && (
          <>
            <Animated.Image
              source={image}
              className="w-full h-full absolute"
              resizeMode="cover"
            />
            <View className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
          </>
        )}
        {loading && <Skeleton className="w-full h-full" />}

        <View
          className={cn(collapsible && "pb-6")}
          style={{ paddingTop: insets.top }}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setHeaderContentHeight(height);
          }}
        >
          {type === 0 && (
            <HeaderTitleAvatar
              title={title || ""}
              titleClassName={titleClassName}
              titleOpacity={titleOpacity}
              titleTranslateY={titleTranslateY}
            />
          )}
          {type === 1 && (
            <HeaderTitleBack
              title={title || ""}
              titleClassName={titleClassName}
              dark={goBackDark}
              titleOpacity={titleOpacity}
              titleTranslateY={titleTranslateY}
            />
          )}
          {type === 2 && <HeaderBack dark={goBackDark} />}
          {HeaderContent}
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

function HeaderTitleAvatar({
  title,
  titleClassName,
  titleOpacity,
  titleTranslateY,
}: {
  title: string;
  titleClassName?: string;
  titleOpacity?: number | AnimatedInterpolation<string | number>;
  titleTranslateY?: any;
}) {
  const router = useRouter();
  return (
    <View className="flex-row w-full items-center px-6 justify-between h-[50px]">
      <Animated.View
        className="max-w-[70%]"
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
        }}
      >
        <H1
          numberOfLines={1}
          className={cn("text-white border-0 font-bold", titleClassName)}
        >
          {title}
        </H1>
      </Animated.View>
      <TouchableOpacity onPress={() => router.push(routes.PROFILE)}>
        <Avatar alt="avatar" className="h-12 w-12">
          <AvatarImage src="https://github.com/mrzachnugent.png" />
          <AvatarFallback>
            <Text>AV</Text>
          </AvatarFallback>
        </Avatar>
      </TouchableOpacity>
    </View>
  );
}

function HeaderTitleBack({
  title,
  titleClassName,
  dark,
  titleOpacity,
  titleTranslateY,
}: {
  title: string;
  titleClassName?: string;
  dark?: boolean;
  titleOpacity?: number | AnimatedInterpolation<string | number>;
  titleTranslateY?: any;
}) {
  return (
    <View className="flex-row w-full items-center px-6 justify-between h-[50px]">
      <Animated.View
        className="max-w-[70%]"
        style={{
          opacity: titleOpacity,
          transform: [{ translateY: titleTranslateY }],
        }}
      >
        <H1
          numberOfLines={1}
          className={cn("text-foreground border-0 font-bold", titleClassName)}
        >
          {title}
        </H1>
      </Animated.View>
      <BackButton dark={dark} />
    </View>
  );
}

function HeaderBack({ dark }: { dark?: boolean }) {
  return (
    <View className="flex-row w-full items-center px-6 justify-end h-[50px]">
      <BackButton dark={dark} />
    </View>
  );
}

function BackButton({ dark }: { dark?: boolean }) {
  const router = useRouter();
  const isDarkMode = useColorScheme().isDarkColorScheme;
  return (
    <TouchableOpacity
      className="flex-row items-center gap-2"
      onPress={() => router.back()}
    >
      <ChevronLeft size={24} color={dark || isDarkMode ? "white" : "black"} />
      <P className={cn("text-foreground text-xl", dark && "text-white")}>
        Indietro
      </P>
    </TouchableOpacity>
  );
}
