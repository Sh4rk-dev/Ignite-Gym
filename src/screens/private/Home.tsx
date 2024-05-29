import { Center, HStack, Text, VStack, FlatList } from "native-base";

import { MuscleGroup } from "src/moked/groupCard";
import { Exercises } from "src/moked/arrayExercise";

import { Icon } from "@components/Icon";
import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { useState } from "react";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [currentExercise, setCurrentExercise] = useState("Peito");

  const Exercise = Exercises.filter((item) => item.type === currentExercise);

  return (
    <VStack>
      <Header>
        <Header.Avatar />
        <Header.Title title="Olá," subTitle="Renan Rapace" hasSubTitle />
        <Icon name="logout" />
      </Header>

      <FlatList
        mt={10}
        pb={12}
        maxH={12}
        horizontal
        data={MuscleGroup}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const Active = currentExercise === item.text;
          return (
            <GroupCard
              text={item.text}
              isActive={Active}
              onPress={() => setCurrentExercise(item.text)}
            />
          );
        }}
        _contentContainerStyle={{ pl: 6, height: 16 }}
      />

      <HStack px={10} pt={10} pb={2} justifyContent={"space-between"}>
        <Text fontSize={"xl"} color={"white"}>
          Exercícios
        </Text>
        <Text fontSize={"xl"} color={"white"}>
          {Exercise.length}
        </Text>
      </HStack>

      <FlatList
        mb={80}
        data={Exercise}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ExerciseCard
              img={item.img}
              text={item.text}
              type={item.type}
              repetitions={item.repetitions}
              numberOfSeries={item.numberOfSeries}
            />
          );
        }}
        _contentContainerStyle={{
          paddingBottom: 16,
          paddingX: 6,
        }}
      />
    </VStack>
  );
}
