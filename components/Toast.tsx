import { ToastType } from "./ToastProvider";
import { ReactNode, useEffect, useRef } from "react";
import { Animated, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { P } from "~/components/ui/typography";
import { Check, CircleX, Info, TriangleAlert } from "lucide-react-native";
import colors from "~/constants/colors";
import { FieldErrors } from "react-hook-form";

interface ToastStyleConfig {
  className: string;
  classText: string;
  Icon: ReactNode;
}

const toastStylesByType: Record<ToastType, ToastStyleConfig> = {
  success: {
    className: "text-white bg-greenLight",
    classText: "text-greenDark",
    Icon: <Check size={20} color={colors.greenDark} />,
  },
  error: {
    className: "text-white bg-errorLight",
    classText: "text-errorDark",
    Icon: <CircleX size={20} color={colors.errorDark} />,
  },
  info: {
    className: "text-white bg-purpleLight",
    classText: "text-white",
    Icon: <Info size={20} color={colors.white} />,
  },
  warning: {
    className: "text-white bg-warningLight",
    classText: "text-warningDark",
    Icon: <TriangleAlert size={20} color={colors.warningDark} />,
  },
};

export default function Toast({
  message,
  duration = 3000,
  type = "success",
  onClose,
}: {
  message: string | FieldErrors<any>;
  duration?: number;
  type: ToastType;
  onClose?: () => void;
}) {
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const insets = useSafeAreaInsets();

  const { className, classText, Icon } = toastStylesByType[type];

  const text =
    typeof message === "string"
      ? message
      : Object.values(message)
          .map((v) => v?.message)
          .filter(Boolean)
          .join(", ");

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (onClose) onClose();
    });
  };

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      close();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose, slideAnim]);

  return (
    <Animated.View
      style={[
        {
          transform: [{ translateY: slideAnim }],
          paddingTop: insets.top,
        },
      ]}
      className={
        "absolute top-0 left-0 right-0 z-50 flex-row items-center justify-center gap-2 " +
        className
      }
    >
      <TouchableOpacity
        className="h-full w-full flex-row items-center justify-items-start p-6 gap-2"
        onPress={close}
      >
        {Icon}
        <P className={classText}>{text}</P>
      </TouchableOpacity>
    </Animated.View>
  );
}
