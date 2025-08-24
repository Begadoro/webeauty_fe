import CollapsibleScreen from "~/components/CollapsibleScreen";
import { ScrollView } from "react-native";
import { MockupShop, shopsMockup, treatmentsMockup } from "~/constants/mockup";
import { TreatmentRow } from "~/components/TreatmentRow";
import { H4, P } from "~/components/ui/typography";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useLoader } from "~/hooks/useLoader";
import { useEffect, useState } from "react";
import { Skeleton } from "~/components/ui/skeleton";
import {CartFab} from "~/components/CartFab";

export default function TreatmentsScreen() {
  const { id } = useLocalSearchParams();
  const loader = useLoader();
  const router = useRouter();

  const [shop, setShop] = useState<MockupShop | null>(null);

  function fetchShop() {
    loader.show();
    setTimeout(() => {
      const fShop = shopsMockup.find((shop) => shop.id === id);
      if (fShop) {
        setShop(fShop);
      } else {
        router.back();
      }
      loader.hide();
    }, 2000);
  }

  useEffect(() => {
    fetchShop();
  }, [id]);

  return (
      <>
        <CollapsibleScreen type={1} title={"Trattamenti"}>
          <ScrollView className="p-6" contentContainerClassName="gap-2">
            {shop && (
                <>
                  <H4>
                    Esplora tutti i trattamenti di{" "}
                    <H4 className="font-bold text-purpleLight">{shop?.name}</H4>
                  </H4>
                  {treatmentsMockup.map((treatment) => (
                      <TreatmentRow key={treatment.id} treatment={treatment} />
                  ))}
                </>
            )}
            {!shop && <Skeleton className="w-full h-56 rounded-xl" />}
          </ScrollView>
        </CollapsibleScreen>
        <CartFab />
      </>

  );
}
