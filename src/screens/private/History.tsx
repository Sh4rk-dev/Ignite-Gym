import { Header } from "@components/Header";
import { VStack } from "native-base";

export function History() {
  return (
    <VStack flex={1}>
      <Header>
        <Header.Title position={"center"} title="Histórico de Exercícios" />
      </Header>
    </VStack>
  );
}
