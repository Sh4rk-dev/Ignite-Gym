import { useState } from "react";
import { FlatList, HStack, Heading, Icon, Text, VStack } from "native-base";

import { MuscleGroup } from "@moked/groupCard";
import { Exercises } from "@moked/arrayExercise";

import { MaterialIcons } from "@expo/vector-icons";

import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { ExerciseCard } from "@components/ExerciseCard";

export function Home() {
  const [currentExercise, setCurrentExercise] = useState("Peito");

  const Exercise = Exercises.filter((item) => item.type === currentExercise);

  return (
    <VStack flex={1}>
      <Header>
        <Header.Avatar />
        <Header.Title title="Olá," subTitle="Renan Rapace" hasSubTitle />
        <Icon name="logout" as={MaterialIcons} color={"white"} size={6} />
      </Header>

      <FlatList
        mt={10}
        pb={12}
        maxH={10}
        horizontal
        data={MuscleGroup}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          const Active =
            currentExercise.toLocaleUpperCase() ===
            item.text.toLocaleUpperCase();
          return (
            <GroupCard
              text={item.text}
              isActive={Active}
              onPress={() => setCurrentExercise(item.text)}
            />
          );
        }}
        _contentContainerStyle={{ px: 6, height: 16 }}
      />

      <VStack flex={1} px={6}>
        <HStack pt={10} pb={2} justifyContent={"space-between"}>
          <Heading fontSize={"xl"} color={"gray.200"}>
            Exercícios
          </Heading>
          <Text fontSize={"md"} color={"gray.200"}>
            {Exercise.length}
          </Text>
        </HStack>

        <FlatList
          mb={22}
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
            paddingBottom: 20
          }}
        />
      </VStack>
    </VStack>
  );
}
