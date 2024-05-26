import { THEME } from "src/theme";
import { Center } from "native-base";
import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface IIconProps {
  name?: ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
}

export function HeaderIcon({ name, size = 20 }: IIconProps) {
  return (
    <Center justifyContent={"end"} w={"full"} paddingRight={5}>
      <TouchableOpacity onPress={() => console.log("Saiu dá conta")}>
        <MaterialIcons name={name} size={size} color={THEME.colors.white} />
      </TouchableOpacity>
    </Center>
  );
}
