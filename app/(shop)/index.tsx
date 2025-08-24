import CollapsibleScreen from "~/components/CollapsibleScreen";
import { H2, H4, P } from "~/components/ui/typography";
import { Href, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  MockupReview,
  MockupShop,
  MockupTreatment,
  reviewsMockup,
  shopsMockup,
  treatmentsMockup,
} from "~/constants/mockup";
import { useLoader } from "~/hooks/useLoader";
import { Skeleton } from "~/components/ui/skeleton";
import { Linking, Platform, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Tag from "~/components/Tag";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  CirclePlus,
  MapPin,
  Phone,
  Plus,
  Star,
  Timer,
} from "lucide-react-native";
import colors from "~/constants/colors";
import { routes } from "~/constants/routes";
import { Badge } from "~/components/ui/badge";
import { TreatmentRow } from "~/components/TreatmentRow";
import { CartFab } from "~/components/CartFab";

export default function ShopScreen() {
  const { id } = useLocalSearchParams();
  const loader = useLoader();
  const router = useRouter();
  const [shop, setShop] = useState<MockupShop | undefined>();
  const [fabVisible, setFabVisible] = useState(false);
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

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

  async function fetchCoords() {
    if (shop) {
      const coordsReq = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(shop.address)}&format=json&limit=1`,
      );
      if (coordsReq.ok) {
        const json = await coordsReq.json();
        setCoords({
          latitude: parseFloat(json[0].lat),
          longitude: parseFloat(json[0].lon),
        });
      }
    }
  }

  useEffect(() => {
    fetchCoords().then();
  }, [shop]);

  useEffect(() => {
    fetchShop();
  }, []);

  return (
    <>
      <CollapsibleScreen
        image={{ uri: shop?.imgUri }}
        loading={!shop}
        type={1}
        title={shop?.name}
        titleClassName="text-2xl text-white"
        goBackDark
        collapsible
        showTitleOnEndScroll
        HeaderContent={
          <View className="flex-col px-6 gap-1">
            <H2 className="font-extrabold text-white">{shop?.name}</H2>
            <View className="flex-row gap-2 items-center">
              <Star color={colors.purpleLight} />
              <P className="text-white">4.8 (320 recensioni)</P>
            </View>
            <View className="flex-row gap-2">
              <Tag type={"hair"} />
              <Tag type={"nails"} />
            </View>
          </View>
        }
      >
        <View className="flex-1 p-6 gap-4">
          {shop && (
            <>
              <MostPopularCard id={shop.id} setFabVisible={setFabVisible} />
              <InfoCard shop={shop} />
              {coords && <MapCard coords={coords} shop={shop} />}
              <ReviewsCard />
            </>
          )}
          {!shop && (
            <>
              <Skeleton className="w-full h-36 rounded-xl" />
              <Skeleton className="w-full h-56 rounded-xl" />
              <Skeleton className="w-full h-56 rounded-xl" />
            </>
          )}
        </View>
      </CollapsibleScreen>
      <CartFab visible={fabVisible} onPress={() => {}} />
    </>
  );
}

function InfoCard({ shop }: { shop: MockupShop }) {
  return (
    <Card className="p-3 gap-4">
      <H4 className="font-bold">Informazioni</H4>
      <View className="flex-row gap-2">
        <Tag type={"hair"} />
        <Tag type={"nails"} />
      </View>
      <P className="leading-none">{shop.description}</P>
      <View className="gap-2">
        <TouchableOpacity className="flex-row gap-2 items-center">
          <Phone color={colors.purpleLight} size={16} />
          <P>+39 0184 123456</P>
        </TouchableOpacity>
        <TouchableOpacity className="flex-row gap-2 items-center">
          <MapPin color={colors.purpleLight} size={16} />
          <P>{shop.address}</P>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

function MostPopularCard({
  id,
  setFabVisible,
}: {
  id: string;
  setFabVisible: (visible: boolean) => void;
}) {
  const router = useRouter();
  return (
    <Card className="p-3 gap-4">
      <H4 className="font-bold">I piú popolari</H4>
      <View className="flex-col gap-2">
        {treatmentsMockup.slice(0, 3).map((treatment) => (
          <TreatmentRow
            key={treatment.id}
            treatment={treatment}
            onPress={() => setFabVisible(true)}
          />
        ))}
        <P className="text-center text-gray">
          + {treatmentsMockup.length} altri
        </P>
      </View>
      <Button
        className={"bg-purplePrimary"}
        onPress={() => router.push(`${routes.TREATMENTS}?id=${id}` as Href)}
      >
        <P className="text-white font-bold">Vedi tutti i trattamenti</P>
      </Button>
    </Card>
  );
}

function MapCard({
  coords,
  shop,
}: {
  coords: { latitude: number; longitude: number };
  shop: MockupShop;
}) {
  const url = Platform.select({
    ios: `maps:0,0?q=${shop.address}`,
    android: `geo:0,0?q=${shop.address}`,
  });
  return (
    <TouchableOpacity
      className="gap-4 h-56"
      onPress={() => Linking.openURL(url || "")}
    >
      <MapView
        scrollEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        pitchEnabled={false}
        style={{ flex: 1, borderRadius: 12 }}
        initialRegion={{
          ...coords,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={coords} />
      </MapView>
    </TouchableOpacity>
  );
}

function ReviewsCard() {
  return (
    <Card className="p-3 gap-4">
      <H4 className="font-bold">Recensioni</H4>
      {reviewsMockup.slice(0, 3).map((review) => (
        <ReviewRow key={review.id} review={review} />
      ))}
      <Button variant="outline">
        <P className="text-purplePrimary font-bold">Vedi tutte le recensioni</P>
      </Button>
    </Card>
  );
}

function ReviewRow({ review }: { review: MockupReview }) {
  return (
    <View className="flex-col">
      <View className="flex-col gap-1">
        <P className="font-bold leading-none">{review.title}</P>
        <P className="text-gray leading-none">{review.comment}</P>
      </View>
      <View className="flex-row items-center gap-1">
        <P>{review.rating}</P>
        <Star color={colors.purplePrimary} size={16} />
        <P>{"• " + new Date(review.date).toLocaleDateString()}</P>
      </View>
    </View>
  );
}
