import { useState } from "react";

import { SectionList } from "react-native";
import { Heading, VStack } from "native-base";

import { Data } from "@moked/historyExercise";

import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";

export function History() {
  const HistoryExercise = Data;

  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Histórico de Exercícios" />
      </Header>

      <SectionList
        contentContainerStyle={{
          paddingHorizontal: 20
        }}
        sections={HistoryExercise}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => {
          return (
            <Heading
              mt={10}
              mb={5}
              mx={5}
              fontSize={"md"}
              color={"gray.100"}
              textTransform={"capitalize"}
            >
              {section.title}
            </Heading>
          );
        }}
      />
    </VStack>
  );
}
