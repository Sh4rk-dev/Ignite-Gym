import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, Text, VStack } from "native-base";

type HistoryCardProps = {
  data: HistoryDTO;
};

export function HistoryCard({ data }: HistoryCardProps) {
  return (
    <HStack
      px={5}
      py={4}
      mb={3}
      w={"full"}
      rounded={"md"}
      bg={"gray.600"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <VStack mr={5} flex={1}>
        <Heading
          color={"white"}
          fontSize={"md"}
          fontFamily={"heading"}
          textTransform={"capitalize"}
          numberOfLines={1}
        >
          {data.group}
        </Heading>

        <Text color={"gray.200"} fontSize={"lg"} numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>

      <Text color={"gray.300"} fontSize={"md"}>
        {data.hour}
      </Text>
    </HStack>
  );
}
