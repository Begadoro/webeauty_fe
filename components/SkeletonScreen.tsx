import CollapsibleScreen from "~/components/CollapsibleScreen";
import { Skeleton } from "~/components/ui/skeleton";
import { View } from "react-native";

export default function SkeletonScreen() {
  return (
    <CollapsibleScreen>
      <View className="flex-1 p-6 gap-4">
        <Skeleton className="w-full h-36 rounded-xl" />
        <Skeleton className="w-full h-56 rounded-xl" />
        <Skeleton className="w-full h-44 rounded-xl" />
      </View>
    </CollapsibleScreen>
  );
}
