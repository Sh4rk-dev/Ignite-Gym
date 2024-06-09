import { Input as NativeBaseInput, IInputProps, Text } from "native-base";

interface IInputTextProps extends IInputProps {
  label?: string;
}

export function Input({ label, ...rest }: IInputTextProps) {
  return (
    <>
      {label && (
        <Text color="red.500" flex={1} w={"full"}>
          {label}
        </Text>
      )}

      <NativeBaseInput
        h={14}
        px={4}
        mb={4}
        borderWidth={label ? 1 : 0}
        borderColor={label && "red.500"}
        fontSize={"md"}
        color={"white"}
        bg={"gray.700"}
        _focus={
          label
            ? {
                bg: "gray.700",
                borderWidth: 1,
                borderColor: "red.500",
              }
            : {
                bg: "gray.700",
                borderLeftWidth: 2,
                borderColor: "green.500",
              }
        }
        placeholderTextColor={label ? "red.500" : "gray.300"}
        {...rest}
      />
    </>
  );
}
