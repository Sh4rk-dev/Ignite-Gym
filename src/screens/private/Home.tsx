import { FlatList } from "react-native";
import { Center, HStack, Text, VStack, View } from "native-base";

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
  const GroupCardMuscle = MuscleGroup;

  return (
    <VStack flex={1} alignItems={"center"}>
      <Header>
        <Header.Avatar />
        <Header.Title title="Olá," subTitle="Renan Rapace" hasSubTitle />
        <Icon name="logout" />
      </Header>

      <Center mx={6} h={24}>
        <FlatList
          horizontal
          data={GroupCardMuscle}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log(currentExercise);
            return (
              <GroupCard
                text={item.text}
                isActiveText={currentExercise}
                onPress={() => setCurrentExercise(item.text)}
              />
            );
          }}
        />
      </Center>

      <HStack px={10} my={3} w={"full"} justifyContent={"space-between"}>
        <Text fontSize={"xl"} color={"white"}>
          Exercícios
        </Text>
        <Text fontSize={"xl"} color={"white"}>
          {Exercise.length}
        </Text>
      </HStack>

      <Center w={"lg"} flex={1} pb={20}>
        <FlatList
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
        />
      </Center>
    </VStack>
  );
}
