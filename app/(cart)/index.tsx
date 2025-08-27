import CollapsibleScreen from "~/components/CollapsibleScreen";
import { View } from "react-native";
import { useCartStore } from "~/hooks/useCartStore";
import { H4, P } from "~/components/ui/typography";
import { BrushCleaning } from "lucide-react-native";
import colors from "~/constants/colors";
import { useMemo, useState } from "react";

import { useRouter } from "expo-router";
import Animated, { SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { Treatments } from "~/components/cart/Treatments";
import { DateTimeSelect } from "~/components/cart/DateTimeSelect";
import { PaymentMethod } from "~/constants/types";
import { Payment } from "~/components/cart/Payment";
import { Recap } from "~/components/cart/Recap";
import { useLoader } from "~/hooks/useLoader";
import { routes } from "~/constants/routes";

export default function CartScreen() {
  const cartStore = useCartStore();
  const router = useRouter();
  const loader = useLoader();

  const [step, setStep] = useState(0);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>(PaymentMethod.CASH);

  const dateTime = useMemo(() => {
    if (!time) {
      const newDate = new Date(date);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    }

    const [hoursStr, minutesStr] = time.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    const newDate = new Date(date);
    newDate.setHours(hours, minutes, 0, 0);

    return newDate;
  }, [date, time]);

  function onBookTreatment() {
    loader.show();
    setTimeout(() => {
      loader.hide();
      cartStore.clearCart();
      router.replace(routes.BOOKED);
    }, 2000);
  }

  return (
    <CollapsibleScreen type={1} title={"Carrello"} onBack={router.back}>
      {cartStore.items.length > 0 ? (
        <Animated.View
          key={step}
          entering={SlideInRight.duration(300)}
          exiting={SlideOutLeft.duration(300)}
        >
          {step === 0 && <Treatments setStep={setStep} />}
          {step === 1 && (
            <DateTimeSelect
              setStep={setStep}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
            />
          )}
          {step === 2 && (
            <Payment
              setStep={setStep}
              payment={payment}
              setPayment={setPayment}
            />
          )}
          {step === 3 && (
            <Recap
              setStep={setStep}
              dateTime={dateTime}
              payment={payment}
              onBookTreatment={onBookTreatment}
            />
          )}
        </Animated.View>
      ) : (
        <View className="flex-col items-center gap-2 w-full py-10">
          <BrushCleaning color={colors.purpleLight} size={48} />
          <H4 className="text-center">Carrello vuoto</H4>
          <P className="text-center">
            Torna indietro e seleziona qualche trattamento per continuare!
          </P>
        </View>
      )}
    </CollapsibleScreen>
  );
}
