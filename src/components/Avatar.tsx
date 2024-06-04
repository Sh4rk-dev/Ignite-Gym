import { IImageProps, Image } from "native-base";

interface IImgProps extends IImageProps {
  size: number;
}

export function Avatar({ size, ...rest }: IImgProps) {
  return (
    <Image
      w={size}
      h={size}
      borderWidth={2}
      rounded={"full"}
      borderColor="black"
      {...rest}
    />
  );
}
