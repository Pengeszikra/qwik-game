import { diffByCard, type Card, type MultipleState, type Owner, type OwnerId, debugFunction } from '~/cardgame/cardFactory';
import { createList, nextOf } from './arrayUtils';
import { rndCard } from './card';

type ACT<T> = (p:T, store: MultipleState) => void
type DO = (store: MultipleState) => void

export const sitDown:ACT<Owner> = (owner, store) => {
  if (owner.id in store.owners) return;

  store.owners[owner.id] = owner;
  store.order = [...store.order, owner.id];
};

export const collect:ACT<Card> = (card, store) => { card; store; }

export const draw:ACT<OwnerId> = (id, store) => { id; store; }

export const focus:ACT<OwnerId> = (id, store) => { store.focus = id; }

export const playToCenter:ACT<Card> = (card, store) => {
  if (!(card.owner in store.owners) || store.flying) return;

  store.center = card;
  // store.owners[card.owner].hand = store.owners[card.owner].hand.filter(({id}) => id !== card.id);
}
export const playCard:ACT<Card> = (card, store) => {
  if (!(card.owner in store.owners) || store.flying) return;
  const hand = store.owners[card.owner].hand;
  if (hand.length < 1) return;
  const left = hand.filter(({id}) => id !== card.id);
  if (hand.length > 0 && left.length === hand.length) return;
  const flying = store.center === undefined ? store.flying : card;

  store.diff = (store.center && flying)
    ? diffByCard(store.center, flying)
    : store.diff
    ;
  store.debug = (store.center && flying)
    ? debugFunction(store.center, flying)
    : ""
    ;
  store.flying = card;
  store.owners[card.owner].hand = left;
}
export const playResult:DO = (store) => {
  if (store.flying === undefined || store.diff === undefined || !(store.flying.owner in store.owners)) return;
  const {hand, deck} = store.owners[store.flying.owner];
  const needToFill = hand.length < 3 && deck.length;
  store.owners[store.flying.owner].hand = needToFill ? [...hand, deck[0]] : hand;
  store.owners[store.flying.owner].deck = needToFill ? deck.slice(1) : deck;
  store.owners[store.flying.owner].score += store.diff;
  store.center = store.flying;
  store.flying = undefined;
  store.diff = undefined;
  store.debug = "",
  store.focus = nextOf(store.order, store.focus);
 }

export const reset:DO = (store) => {
  store.owners = {};
  store.order = [];
  store.center = undefined;
  store.flying = undefined;
  store.diff = undefined;
  store.debug = "";
}

export const setPercent = (value:number, store: MultipleState) => { value; store; }

export const startBattle = (value:number, store: MultipleState) => { value; store; }

export const undo:ACT<Card> = (card, store) => { card; store; }

export const writeHistory:ACT<number> = (value, store) => { value; store; }

export const virtualSetup:DO = (store) => {
  reset(store);

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
  focus(starterId, store);
  const [card] = store.owners[starterId].hand;
  playToCenter(card, store);
  draw(starterId, store);
  draw(starterId, store);
  focus(nextId, store);

  Promise.any([
    autoplay(store),
    delay(2000)
  ]).then(() => 
    reset(store)
  )
}

export const swapDebug:DO = (store) => store.visibility = !(store.visibility);

export const delay = (time:number) => new Promise(resolver => setTimeout(resolver, time));

export const autoplay:DO = async(store) => {
  const speed = 100;

  while (store.owners[store.focus].hand.length >= 1) {
    for (const owId of store.order) {
      console.log(`actor: ${owId}`)
      await Promise.any([
        delay(speed)
      ])
      focus(owId, store);
      await delay(speed);
      playCard(store.owners[owId].hand[0], store);
      await delay(speed);
      playResult(store);
    }
  }
};