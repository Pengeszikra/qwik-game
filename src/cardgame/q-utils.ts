import { diffByCard, type Card, type MultipleState, type Owner, type OwnerId, debugFunction } from '~/cardgame/cardFactory';
import { createList, nextOf } from './arrayUtils';
import { rndCard } from './card';

type ACT<T> = (p:T, store: MultipleState) => void
type BCT = (store: MultipleState) => void

export const sitDown = (
  owner: Owner,
  store: MultipleState
) => {
  if (owner.id in store.owners) return;

  store.owners[owner.id] = owner;
  store.order = [...store.order, owner.id];
};

export const collect = (card:Card, store: MultipleState) => { card; store; }

export const draw = (id:OwnerId, store: MultipleState) => { id; store; }

export const focus:ACT<OwnerId> = (id, store) => { store.focus = id; }

export const playCard = (card:Card, store: MultipleState) => { 
  if (!(card.owner in store.owners) || store.flying) return;
  const hand = store.owners[card.owner].hand;
  if (hand.length < 1) return;
  const left = hand.filter(({id}) => id !== card.id);
  if (hand.length > 0 && left.length === hand.length) return;
  const flying = store.center === undefined ? store.flying : card;
  const diff = store.center && flying
    ? diffByCard(store.center, flying)
    : store.diff
    ;
  const debug = store.center && flying
    ? debugFunction(store.center, flying)
    : ""
    ;

  store.flying = card;
  store.diff = diff;
  store.debug = debug;
  store.owners[card.owner].hand = hand;

  
}
export const playResult = ( store: MultipleState) => {
  if (store.flying === undefined || store.diff === undefined) return store;
  const {score, hand, deck} = store.owners[store.flying.owner];
  const needToFill = hand.length < 3 && deck.length;

  store.owner[store.flying.owner].hand = needToFill ? [...hand, deck[0]] : hand;
  store.owner[store.flying.owner].deck = needToFill ? deck.slice(1) : deck;
  store.owner[store.flying.owner].score = score + store.diff;
  store.center = store.flying;
  store.flying = undefined,
  store.diff = undefined,
  store.debug = "",
  store.focus = nextOf(store.order, store.focus);
 }

export const reset = ( store: MultipleState) => { store; }

export const setPercent = (value:number, store: MultipleState) => { value; store; }


export const startBattle = (value:number, store: MultipleState) => { value; store; }

export const undo = (card:Card, store: MultipleState) => { card; store; }

export const writeHistory = (value:number, store: MultipleState) => { value; store; }

export const virtualSetup:BCT = (store) => {
  const botList = ["A-bot", "B-bot", "C-bot", "D-bot"];

  for (const bot of botList) {
    sitDown({
      id: bot,
      name: bot,
      score: 0,
      hand: createList(3, () => rndCard(bot)),
      deck: createList(5, () => rndCard(bot)),
    }, store);
  }

  const [starterId, nextId] = store.order;
  const [card] = store.owners[starterId].hand;
  focus(starterId, store);
  playCard(card, store);
  playResult(store);
  draw(starterId, store);
  focus(nextId, store);
}
