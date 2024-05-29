type TypeExerciseMuscle =
  | "Peito"
  | "Pernas"
  | "Costas"
  | "Ombros"
  | "Braços"
  | "Glúteos"
  | "Abdómen"
  | "Antebraços"
  | "Panturrilhas"
  | "Tríceps";

export interface MuscleGroupCard {
  id: string;
  text: string;
}
export interface ArrayExercise {
  id: string;
  img: string;
  text: string;
  type: TypeExerciseMuscle;
  numberOfSeries: number;
  repetitions: number;
}
