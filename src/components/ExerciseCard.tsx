import { Center, HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { Icon } from "./Icon";

interface IExerciseCardProps {
  id?: string;
  img: string;
  text: string;
  type: string;
  numberOfSeries: number;
  repetitions: number;
}

export function ExerciseCard({
  id,
  img,
  type,
  text,
  repetitions,
  numberOfSeries,
}: IExerciseCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <HStack
        p={3}
        my={2}
        h={24}
        space={4}
        w={"full"}
        rounded={"md"}
        justifyContent={"center"}
        alignItems={"center"}
        bg={"gray.500"}
      >
        <Image source={{ uri: img }} alt="teste" w={62} h={62} rounded={"md"} />

        <VStack justifyContent={"center"} flex={1}>
          <Text
            color={"white"}
            w={40}
            fontFamily={"heading"}
            fontSize={"lg"}
            mb={1}
            numberOfLines={1}
          >
            {text}
          </Text>
          <HStack>
            <Text color={"white"}>
              {numberOfSeries} séries x {repetitions} repetições
            </Text>
          </HStack>
        </VStack>
        <Icon name="keyboard-arrow-right" />
      </HStack>
    </TouchableOpacity>
  );
}
