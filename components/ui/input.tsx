import * as React from "react";
import {
  TextInput,
  View,
  type TextInputProps,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { cn } from "~/lib/utils";
import colors from "~/constants/colors";
import { useMemo } from "react";

function Input({
  className,
  placeholderClassName,
  invalid,
  LeftIcon,
  RightIcon,
  onRightIconPress,
  ...props
}: TextInputProps & {
  invalid?: boolean;
  ref?: React.RefObject<TextInput>;
  LeftIcon?: React.ComponentType<any>;
  RightIcon?: React.ComponentType<any>;
  onRightIconPress?: () => void;
}) {
  const [isFocused, setIsFocused] = React.useState(false);

  const iconsColor = useMemo(() => {
    return invalid
      ? colors.errorDark
      : isFocused
        ? colors.purplePrimary
        : colors.gray;
  }, [isFocused, invalid]);

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        className={cn(
          "flex-row items-center h-10 native:h-14 web:w-full rounded-xl border bg-background px-3",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          invalid && "border-errorDark",
          isFocused && !invalid && "border-purplePrimary", // Purple border on focus
          !isFocused && !invalid && "border-input", // Default border
          className,
        )}
      >
        {LeftIcon && (
          <View className="mr-2">
            <LeftIcon color={iconsColor} size={20} />
          </View>
        )}

        <TextInput
          className={cn(
            "flex-1 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground",
            placeholderClassName,
            invalid && "placeholder:text-errorDark",
          )}
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
        />

        {RightIcon && (
          <TouchableOpacity onPress={onRightIconPress} className="ml-2">
            <RightIcon color={iconsColor} size={20} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default Input;

export { Input };
