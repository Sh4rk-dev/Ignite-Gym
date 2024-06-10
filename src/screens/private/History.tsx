import { useState } from "react";

import { SectionList } from "react-native";
import { Center, Heading, Image, Text, VStack } from "native-base";

import { Data } from "@moked/historyExercise";

import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";

import EmptySVG from "@assets/EmptyPersonalTrainer.svg";

export function History() {
  const HistoryExercise = Data;

  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Histórico de Exercícios" />
      </Header>

      <SectionList
        sections={HistoryExercise}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        contentContainerStyle={
          HistoryExercise.length === 0
            ? {
                flex: 1,
                justifyContent: "center",
                marginTop: -120,
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
