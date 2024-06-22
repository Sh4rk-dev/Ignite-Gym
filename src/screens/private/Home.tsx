import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, HStack, Heading, Icon, Text, VStack } from "native-base";

import { useAuth } from "@hooks/useAuth";

import { ArrayExercise } from "@utils/interfaces";

import { AppNavigationTabsRoutesProps } from "@routes/app.routes";

import { MuscleGroup } from "@moked/groupCard";
import { Exercises } from "@moked/arrayExercise";

import { MaterialIcons } from "@expo/vector-icons";

import { Header } from "@components/Header";
import { GroupCard } from "@components/GroupCard";
import { ExerciseCard } from "@components/ExerciseCard";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";

export function Home() {
  const { user, signOut } = useAuth();
  const [currentExercise, setCurrentExercise] = useState("Peito");

  const Exercise = Exercises.filter((item) => item.type === currentExercise);

  const Navigation = useNavigation<AppNavigationTabsRoutesProps>();
  
  function handleOpenExerciseDetails(data: ArrayExercise) {
    const ExerciseData = data;
    return Navigation.navigate("exercise"), console.log(ExerciseData);
  }

  return (
    <VStack flex={1}>
      <Header>
        <Header.Avatar
          url={user.avatar ? { uri: user.avatar } : defaultUserPhotoImg}
        />
        <Header.Title title="Olá," subTitle={user.name} hasSubTitle />
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
                onPress={() => handleOpenExerciseDetails(item)}
              />
            );
          }}
          _contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </VStack>
    </VStack>
  );
}
