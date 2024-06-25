import { useEffect, useState } from "react";

import { TouchableOpacity } from "react-native";
import {
  Box,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  Toast,
  VStack,
} from "native-base";

import { Feather } from "@expo/vector-icons";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigationTabsRoutesProps } from "@routes/app.routes";

import BodySVG from "@assets/body.svg";
import SeriesSVG from "@assets/series.svg";
import RepetitionsSVG from "@assets/repetitions.svg";

import { Button } from "@components/Button";
import { Loading } from "@components/loading";

type RouteParamsProps = {
  exerciseId: string;
};

export function Exercise() {
  const route = useRoute();

  const [isLoading, setIsLoading] = useState(true);
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);

  const { exerciseId } = route.params as RouteParamsProps;

  const navigation = useNavigation<AppNavigationTabsRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true);
      const response = await api.get(`/exercises/${exerciseId}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os detalhes do exercício.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.700",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post("history", { exercise_id: exerciseId });

      Toast.show({
        title: "Parabéns. Exercício concluído com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      navigation.navigate("history");
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível registrar o exercício.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails();
  }, [exerciseId]);

  return (
    <VStack flex={1}>
      <VStack px={8} pt={12} bg={"gray.600"}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon size={6} as={Feather} name="arrow-left" color={"green.500"} />
        </TouchableOpacity>

        <HStack
          mt={4}
          mb={8}
          alignContent={"center"}
          justifyContent={"space-between"}
        >
          <Heading
            flexShrink={1}
            fontSize={"lg"}
            color={"gray.100"}
            fontFamily={"heading"}
          >
            {exercise.name}
          </Heading>

          <HStack alignItems={"center"}>
            <BodySVG />

            <Text color={"gray.200"} ml={1} textTransform={"capitalize"}>
              {exercise.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading ? (
        <Loading />
      ) : (
        <VStack p={8}>
          <Box overflow={"hidden"} rounded={"md"} mb={3}>
            <Image
              h={80}
              w={"full"}
              resizeMode="cover"
              overflow={"hidden"}
              alt="Nome do exercício"
              source={{
                uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
              }}
            />
          </Box>

          <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
            <HStack
              mb={6}
              mt={5}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <HStack>
                <SeriesSVG />
                <Text color={"gray.200"} ml={2}>
                  {exercise.series} séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSVG />
                <Text color={"gray.200"} ml={2}>
                  {exercise.repetitions} repetições
                </Text>
              </HStack>
            </HStack>
            <Button
              title="Marcar como realizado"
              isLoading={sendingRegister}
              onPress={handleExerciseHistoryRegister}
            />
          </Box>
        </VStack>
      )}
    </VStack>
  );
}
