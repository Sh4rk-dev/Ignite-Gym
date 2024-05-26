import { HStack, Text, VStack } from "native-base";

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
      flex={1}
      w={"full"}
      space={"4"}
      bg={"gray.600"}
      alignItems={"center"}
      position={"absolute"}
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

Header.Title = HeaderTitle;

export { Header };
