import {
  FormControl,
  IInputProps,
  Input as NativeBaseInput,
} from "native-base";

interface IInputTextProps extends IInputProps {
  errorMessage?: string | null;
}

export function Input({
  errorMessage = null,
  isInvalid,
  ...rest
}: IInputTextProps) {
  const invalid = !!errorMessage || isInvalid;

  return (
    <FormControl isInvalid={invalid}>
      <NativeBaseInput
        h={14}
        px={4}
        mb={4}
        borderWidth={0}
        fontSize={"md"}
        color={"white"}
        bg={"gray.700"}
        _focus={{
          bg: "gray.700",
          borderLeftWidth: 2,
          borderColor: "green.500",
        }}
        isInvalid={invalid}
        _invalid={{
          borderWidth: 1,
          borderColor: "red.500",
          placeholderTextColor: "red.500",
        }}
        placeholderTextColor="gray.300"
        {...rest}
      />
      <FormControl.ErrorMessage mt={-3} pb={3} _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
