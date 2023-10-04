export interface CardDatas {
  id: string;
  skill: string;
  value: number;
}
export interface Card extends CardDatas {
  owner: string;
}

export const debugFunction = (card: Card, played: Card) => `(a = ${card.value}, b = ${played.value}) => ${played.skill};`;
export const diffByCard = (card: Card, played: Card) => new Function(`return (a, b) => ${played.skill};`)()(card.value, played.value);

export interface Owner {
  id: string;
  name: string;
  score: number;
  hand: Card[];
  deck: Card[];
}

export type OwnerId = string;

export interface MultipleState {
  [x: string]: any;
  timer: number;
  owners: Record<OwnerId, Owner>;
  order: OwnerId[];
  tower: Card[];
  focus: OwnerId;
  center?: Card;
  flying?: Card;
  debug: string;
  diff?: number;
  question: string;
  answer: string;
  visibility: boolean;
}

export const initialMultiState: MultipleState = {
  timer: 0,
  owners: {},
  order: [],
  tower: [],
  focus: "",
  debug: "",
  question: "",
  answer: "",
  visibility: false,
}