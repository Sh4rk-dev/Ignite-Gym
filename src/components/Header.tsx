import { HStack, Text, VStack } from "native-base";

type variants = "start" | "center" | "end" | "space-between";

interface IHeaderProps {
  children: React.ReactNode;
  position?: variants;
}

interface IHeaderTitleProps {
  title: string;
  subTitle?: string;
  hasSubTitle?: boolean;
}

function Header({ children, position }: IHeaderProps) {
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
      justifyContent={position}
    >
      {children}
    </HStack>
  );
}

function HeaderTitle({ title, subTitle, hasSubTitle }: IHeaderTitleProps) {
  return (
    <VStack>
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
