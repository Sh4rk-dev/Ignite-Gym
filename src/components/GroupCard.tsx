import { IPressableProps, Pressable, Text } from "native-base";

interface IGroupCardProps extends IPressableProps {
  text: string;
  isActive: boolean;
}

export function GroupCard({ text, isActive, ...rest }: IGroupCardProps) {
  return (
    <Pressable
      {...rest}
      mr={3}
      px={6}
      h={10}
      rounded={"md"}
      bg={"gray.600"}
      overflow={"hidden"}
      isPressed={isActive}
      alignItems={"center"}
      justifyContent={"center"}
      _pressed={{
        borderColor: "green.500",
        borderWidth: 1,
      }}
    >
      <Text
        color={isActive ? "green.500" : "gray.300"}
        textTransform={"uppercase"}
      >
        {text}
      </Text>
    </Pressable>
  );
}
