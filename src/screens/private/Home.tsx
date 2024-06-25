import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  FlatList,
  HStack,
  Heading,
  Icon,
  Text,
  Toast,
  VStack,
} from "native-base";

import { api } from "@services/api";

import { useAuth } from "@hooks/useAuth";
import { ExerciseDTO } from "@dtos/ExerciseDTO";

import { AppError } from "@utils/AppError";
import { AppNavigationTabsRoutesProps } from "@routes/app.routes";

import { MaterialIcons } from "@expo/vector-icons";

import { Header } from "@components/Header";
import { Loading } from "@components/loading";
import { GroupCard } from "@components/GroupCard";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const { signOut } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>();
  const [exercise, setExercise] = useState<ExerciseDTO[]>([]);
  const [currentExercise, setCurrentExercise] = useState("antebraço");

  const navigation = useNavigation<AppNavigationTabsRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate("exercise", { exerciseId });
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true);

      const response = await api.get(`/exercises/bygroup/${currentExercise}`);
      setExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar treinos.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchGroups() {
    try {
      const { data } = await api.get("/groups");
      setGroups(data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os groupos musculares.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExercisesByGroup();
    }, [currentExercise])
  );

  return (
    <VStack flex={1}>
      <Header>
        <Header.Avatar />
        <Header.Title title="Olá," hasSubTitle />
        <Icon
          name="logout"
          as={MaterialIcons}
          color={"white"}
          size={6}
          onPress={signOut}
        />
      </Header>

      <FlatList
        mt={10}
        pb={12}
        maxH={10}
        minH={10}
        horizontal
        data={groups}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const Active =
            currentExercise.toLocaleUpperCase() === item.toLocaleUpperCase();
          return (
            <GroupCard
              text={item}
              isActive={Active}
              onPress={() => setCurrentExercise(item)}
            />
          );
        }}
        _contentContainerStyle={{ px: 6, height: 16 }}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <VStack flex={1} px={6}>
          <HStack
            pt={10}
            pb={2}
            fontFamily={"heading"}
            justifyContent={"space-between"}
          >
            <Heading fontSize={"xl"} color={"gray.200"} fontFamily={"heading"}>
              Exercícios
            </Heading>
            <Text fontSize={"md"} color={"gray.200"}>
              {exercise?.length}
            </Text>
          </HStack>

          <FlatList
            mb={22}
            data={exercise}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <ExerciseCard
                  data={item}
                  onPress={() => handleOpenExerciseDetails(item.id)}
                />
              );
            }}
            _contentContainerStyle={{
              paddingBottom: 20,
            }}
          />
        </VStack>
      )}
    </VStack>
  );
}
