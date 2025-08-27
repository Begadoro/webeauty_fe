import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "~/components/ui/button";
import { P } from "~/components/ui/typography";
import { useState } from "react";
import { useLocales } from "expo-localization";

export function DatePicker({
  open,
  close,
  value,
  setValue,
  minDate,
  maxDate,
  onPick,
}: {
  open: boolean;
  close: () => void;
  value: Date;
  setValue: (value: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  onPick?: () => void;
}) {
  const [thisValue, setThisValue] = useState<Date | undefined>(value);
  const locale = useLocales()[0].languageTag;

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <RNDateTimePicker
          locale={locale}
          mode="date"
          display="spinner"
          value={thisValue || new Date()}
          onChange={(event, date) => setThisValue(date)}
          minimumDate={minDate}
          maximumDate={maxDate}
        />
        <AlertDialogFooter className="flex-row gap-2">
          <Button variant="outline" className="flex-1" onPress={close}>
            <P className="font-bold">Annulla</P>
          </Button>
          <Button
            className="flex-1 bg-purplePrimary"
            onPress={() => {
              setValue(thisValue || new Date());
              onPick?.();
              close();
            }}
          >
            <P className="text-white font-bold">Conferma</P>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
