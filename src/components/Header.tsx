import { HStack, Heading, Text, VStack } from "native-base";
import { Avatar } from "./Avatar";
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

type variants = "start" | "center" | "end" | "space-between";

interface IHeaderProps {
  children: React.ReactNode;
}
interface IHeaderTitleProps {
  title: string;
  subTitle?: boolean;
  position?: variants;
  hasSubTitle?: boolean;
}

function Header({ children }: IHeaderProps) {
  return (
    <HStack
      h={32}
      pb={5}
      px={8}
      pt={16}
      w={"full"}
      space={"4"}
      bg={"gray.600"}
      alignItems={"center"}
    >
      {children}
    </HStack>
  );
}

function HeaderTitle({
  title,
  subTitle,
  hasSubTitle,
  position,
}: IHeaderTitleProps) {
  const { user } = useAuth();

  return (
    <VStack flex={1} alignItems={position}>
      <Heading color={"gray.100"} fontSize={"lg"} fontFamily={"heading"}>
        {title}
      </Heading>
      {hasSubTitle && (
        <Text color={"white"} fontSize={"md"}>
          {!subTitle && user.name}
        </Text>
      )}
    </VStack>
  );
}

function HeaderAvatar() {
  const { user } = useAuth();
  console.log(user.avatar);
  

  return (
    <Avatar
      size={12}
      alt="Imagem do usuário"
      source={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
    />
  );
}

Header.Title = HeaderTitle;
Header.Avatar = HeaderAvatar;

export { Header };
