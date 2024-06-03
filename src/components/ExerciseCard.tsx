import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
interface IExerciseCardProps extends TouchableOpacityProps {
  id?: string;
  img: string;
  text: string;
  type?: string;
  numberOfSeries: number;
  repetitions: number;
}

export function ExerciseCard({
  img,
  text,
  repetitions,
  numberOfSeries,
  ...rest
}: IExerciseCardProps) {
  return (
    <TouchableOpacity activeOpacity={0.8} {...rest}>
      <HStack
        p={2}
        mb={3}
        space={4}
        rounded={"md"}
        bg={"gray.500"}
        alignItems={"center"}
      >
        <Image
          w={62}
          h={62}
          alt="teste"
          rounded={"md"}
          resizeMode="center"
          source={{ uri: img }}
        />

        <VStack justifyContent={"center"} flex={1}>
          <Heading
            w={40}
            mb={1}
            color={"white"}
            fontSize={"md"}
            numberOfLines={1}
          >
            {text}
          </Heading>
          <HStack>
            <Text color={"gray.200"} numberOfLines={2}>
              {numberOfSeries} séries x {repetitions} repetições
            </Text>
          </HStack>
        </VStack>

        <Icon
          size={7}
          as={MaterialIcons}
          color={"gray.200"}
          name="chevron-right"
        />
      </HStack>
    </TouchableOpacity>
  );
}
