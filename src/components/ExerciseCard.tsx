import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";

import { MaterialIcons } from "@expo/vector-icons";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";
interface IExerciseCardProps extends TouchableOpacityProps {
  data: ExerciseDTO;
}

export function ExerciseCard({ data, ...rest }: IExerciseCardProps) {
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
          rounded={"md"}
          resizeMode="cover"
          source={{
            uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
          }}
          alt="Imagem do exercicio"
        />

        <VStack justifyContent={"center"} flex={1}>
          <Heading
            w={40}
            mb={1}
            color={"white"}
            fontSize={"md"}
            numberOfLines={1}
            fontFamily={"heading"}
          >
            {data.name}
          </Heading>
          <HStack>
            <Text color={"gray.200"} numberOfLines={2}>
              {data.series} séries x {data.repetitions} repetições
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
