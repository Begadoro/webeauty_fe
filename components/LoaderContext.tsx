import React, { createContext, useCallback, useContext, useState } from "react";
import { View } from "react-native";
import { Image } from "expo-image";

export type LoaderContextType = {
  show: () => void;
  hide: () => void;
};

export const LoaderContext = createContext<LoaderContextType | undefined>(
  undefined,
);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  return (
    <LoaderContext.Provider value={{ show, hide }}>
      {children}
      {isVisible && (
        <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center bg-backdrop z-50">
          <Image
            source={require("../assets/icons/loader.gif")}
            style={{ width: 100, height: 100 }}
          />
        </View>
      )}
    </LoaderContext.Provider>
  );
};
