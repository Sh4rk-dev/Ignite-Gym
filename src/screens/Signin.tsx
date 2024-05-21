import { VStack, Image, Text, Center, Heading } from "native-base";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";

export function SignIn() {
  return (
    <VStack flex={1} bg={"gray.700"} px={8}>
      <Image
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="cover"
        position="absolute"
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
          Acesse a sua conta
        </Heading>

        <Input placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" />
        <Input placeholder="Senha" secureTextEntry autoCapitalize="none" />
      </Center>
    </VStack>
  );
}
