import { Center } from "native-base";
import { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

import { THEME } from "src/theme";

import { MaterialIcons } from "@expo/vector-icons";

interface IIconProps {
  name?: ComponentProps<typeof MaterialIcons>["name"];
  size?: number;
}

export function Icon({ name, size = 20 }: IIconProps) {
  return (
    <TouchableOpacity onPress={() => console.log("Saiu dá conta")}>
      <MaterialIcons name={name} size={size} color={THEME.colors.white} />
    </TouchableOpacity>
  );
}

{
  /* {
          import { Icon } from "Native-Base"
          
          Icon is import "Native Base"
          <Icon as={MaterialIcons} name="logout" color="gray.200" size={7} />;
        } */
}
