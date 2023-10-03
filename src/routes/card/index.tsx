import { component$, useStore } from "@builder.io/qwik";
import { cardInfo } from "~/cardgame/card";
import { initialMultiState } from "~/cardgame/cardFactory";
import { playCard, playResult, undo, virtualSetup } from "~/cardgame/q-utils";

export default component$(() => {

  const state = useStore(initialMultiState);

  return (
    <main class="bg-black min-h-screen grid place-items-center relative text-green-300">
      <section class="w-3/4 overflow-hidden">
        <p><s>React</s></p>
        <p>"The react-state-factory works as expected" ... qwik works better?</p>
        <button class="bg-green-400 hover:bg-green-200 text-black p-1 rounded text-center mt-2" onClick$={() => virtualSetup(state)}>start the game</button>
        <br />
        <section class="grid grid-cols-4 gap-4 place-items-start">
          <section>
            <p>Center {state.focus}</p>
            {state?.center && cardInfo(state.center)}
          </section>
          {state.flying && (
            <section>
              <p>{state.owners[state.flying.owner].name} is playing:</p>
              {cardInfo(state.flying)}
            </section>
          )}
          {state.center && state.flying && (
            <section class="col-span-2">
              <p>Function = result</p>
              <p>{state.debug} = {state.diff}</p>
            </section>
          )}
        </section>
        <br />
        <section class="grid grid-cols-4 gap-4">
          {state.order.map(ownerId => (
            <section key={ownerId}>
              <span class={ownerId === state.focus ? "bg-green-400 text-black p-1 rounded" : ""}>
                {state.owners[ownerId].name} score: {state.owners[ownerId].score}
              </span>
              <p>- hand: </p>{
                state.owners[ownerId].hand.map(card => (
                  ownerId === state.focus && !state.flying
                    ? <p key={card.id}><button type="button" class="bg-green-400 hover:bg-green-200 text-black p-1 rounded text-center mb-2" onClick$={() => playCard(card, state)}>{cardInfo(card)}</button></p>
                    : <p key={card.id}>{cardInfo(card)}</p>
                ))
              }
              {state.flying && ownerId === state.focus && (
                <p class="flex gap-2">
                  <button type="button" class="bg-green-400 hover:bg-green-200 text-black p-1 rounded text-center mt-2" onClick$={() => state.flying && undo(state.flying, state)}>undo</button>
                  <button type="button" class="bg-green-400 hover:bg-green-200 text-black p-1 rounded text-center mt-2" onClick$={() => playResult(state)}>consent</button>
                </p>
              )}
              <p>- deck: </p>{
                state.owners[ownerId].deck.map(card => (
                  <p key={card.id}>{cardInfo(card)}</p>
                ))
              }
            </section>
          ))}
        </section>
        <p class="my-4">Score order:</p>
        <section class="grid grid-cols-4 gap-4">
          {state.order
            .map(ownerId => state.owners[ownerId])
            .sort(({score:a}, {score:b}) => b - a)
            .map(({name, score}) => <p key={name}>{name} : {score}</p>)
          }
        </section>
        {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      </section>
    </main>
  )
});
