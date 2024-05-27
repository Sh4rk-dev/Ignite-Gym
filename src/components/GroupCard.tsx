import { Center, Text } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface IGroupCardProps extends TouchableOpacityProps {
  text: string;
  isActiveText: string;
}

export function GroupCard({ text, isActiveText, ...rest }: IGroupCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.6} {...rest}>
      <Center
        mt={10}
        h={10}
        mx={1}
        bg={"gray.500"}
        w={"24"}
        rounded={"sm"}
        borderWidth={isActiveText === text ? 0.5 : 0}
        borderColor={isActiveText === text ? "green.500" : ""}
      >
        <Text color={isActiveText === text ? "green.500" : "gray.300"}>
          {text}
        </Text>
      </Center>
    </TouchableOpacity>
  );
}
