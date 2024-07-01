import { useCallback, useState } from "react";

import { Center, Heading, Text, Toast, VStack } from "native-base";
import { SectionList } from "react-native";
import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";

import EmptySVG from "@assets/EmptyPersonalTrainer.svg";
import { useFocusEffect } from "@react-navigation/native";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [historyExercise, setHistoryExercise] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setHistoryExercise(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";

      Toast.show({
        title,
        placement: "top",
        bgColor: "red.700"
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Histórico de Exercícios" />
      </Header>

      <SectionList
        sections={historyExercise}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoryCard data={item} />}
        contentContainerStyle={
          historyExercise.length === 0
            ? {
                flex: 1,
                justifyContent: "center",
                marginTop: -120
              }
            : { paddingHorizontal: 20 }
        }
        renderSectionHeader={({ section }) => {
          return (
            <Heading
              mt={10}
              mb={5}
              mx={5}
              fontSize={"md"}
              color={"gray.100"}
              fontFamily={"heading"}
              textTransform={"capitalize"}
            >
              {section.title}
            </Heading>
          );
        }}
        ListEmptyComponent={() => (
          <Center px={5}>
            <EmptySVG width={270} height={270} />

            <Heading color={"gray.100"} fontSize={"xl"} fontFamily={"heading"}>
              Nenhum treino encontrado aqui!
            </Heading>

            <Text color={"gray.100"} fontSize={"md"} textAlign={"center"}>
              Você não concluiu nenhum treino, volte para aba de treino.
            </Text>
          </Center>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
