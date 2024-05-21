import { Input as NativeBaseInput, IInputProps } from "native-base";

export function Input({ ...rest }: IInputProps) {
  return (
    <NativeBaseInput
      h={14}
      px={4}
      mb={4}
      borderWidth={0}
      fontSize={"md"}
      color={"white"}
      bg={"gray.700"}
      borderRadius={5}
      _focus={{
        bg: "gray.700",
        borderLeftWidth: 2,
        borderColor: "green.500",
      }}
      placeholderTextColor="gray.300"
      {...rest}
    />
  );
}
