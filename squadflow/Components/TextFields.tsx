import { Fieldset, Input, Label } from "tamagui";
import { StyleSheet } from "react-native";
function TextField({ label, ...props }) {
  return (
    <Fieldset gap="$2">
      <Label unstyled fontWeight="800">
        {label}
      </Label>
      <Input borderRadius="$2" borderWidth={0} {...props} />
    </Fieldset>
  );
}

const styles = StyleSheet.create({
  label: {
    textTransform: "capitalize",
    fontWeight: "800",
  },
});

export default TextField;
