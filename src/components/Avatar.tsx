import { IImageProps, Image } from "native-base";
import ImgProfile from "@assets/userPhotoDefault.png";

interface IImgProps extends IImageProps {
  size: number;
}

export function Avatar({ size, ...rest }: IImgProps) {
  return (
    <Image
      defaultSource={ImgProfile}
      w={size}
      h={size}
      rounded={"full"}
      borderWidth={2}
      borderColor="black"
      {...rest}
    />
  );
}
