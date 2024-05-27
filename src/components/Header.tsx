import { HStack, Text, VStack } from "native-base";
import { Avatar } from "./Avatar";

type variants = "start" | "center" | "end" | "space-between";

interface IHeaderProps {
  children: React.ReactNode;
}

interface IHeaderTitleProps {
  title: string;
  subTitle?: string;
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
  return (
    <VStack flex={1} alignItems={position}>
      <Text color={"white"} fontSize={"md"}>
        {title}
      </Text>
      {hasSubTitle && (
        <Text color={"white"} fontSize={"md"}>
          {subTitle}
        </Text>
      )}
    </VStack>
  );
}

function HeaderAvatar() {
  return (
    <Avatar
      size={12}
      alt="Imagem do usuário"
      source={{ uri: "https://github.com/Sh4rk-dev.png" }}
    />
  );
}

Header.Title = HeaderTitle;
Header.Avatar = HeaderAvatar;

export { Header };
