import { Center, Heading, ScrollView, Text, VStack } from "native-base";
import { Image } from "react-native";

import BackgroundImg from "@assets/background.png";
import LogoSvg from "@assets/logo.svg";

import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={8}>
        <Image
          resizeMode="cover"
          alt="Pessoas treinando"
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          style={{ position: "absolute" }}
        />

        <Center my={24}>
          <LogoSvg />
          <Text color={"gray.100"} fontSize={"sm"}>
            Treine sua mente e o seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            mb={6}
            fontSize={"xl"}
            color={"gray.100"}
            fontFamily={"heading"}
          >
            Crie sua conta
          </Heading>

          <Input placeholder="Nome" type="text" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input placeholder="Senha" secureTextEntry autoCapitalize="none" />
          <Button title="Criar e acessar" />
        </Center>

        <Button
          onPress={handleGoBack}
          title="Voltar para o login"
          variant={"outline"}
          mt={32}
        />
      </VStack>
    </ScrollView>
  );
}
