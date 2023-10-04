
# qwik-game
poc repo how can I convert my [game-of-function](https://github.com/Pengeszikra/game-of-function) from react / [react-state-factory](https://github.com/Pengeszikra/react-state-function) / saga implementation to qwik ⚡️

create new qwik project is so simple
```shell
pnpm create qwick@lates
```

add tailwind - or - any another package which one is need a little basic config is also easy
```shell
pnpm qwik add tailwind
```

## Why qwik ?
Because qwik have awesome hydration philosophy, and give a different state handling than react have, and I know that way very well, so I like to try the `Signals`.
> bonus: in JSX part qwik use `class` instead `className` God bless the creators!

## Try implement some Signal 

```ts
import type { Signal } from "@builder.io/qwik";
import type { Card, MultipleState, Owner, OwnerId } from '~/cardgame/cardFactory';

export const sitDown = (
  {value: owner}: Signal<Owner>,
  store: MultipleState
) => {
  store.owners[owner.id] = owner;
  store.order = [...store.order, owner.id];
};
```

[trolls playing](https://www.bing.com/images/create/trolls-playing-a-cardgame-with-mathematical-2cminim/651d5c96a93440998db15456df84531b?id=dp1S1mSxI49GGMq2G%2BNPEg%3D%3D&view=detailv2&idpp=genimg&form=GCRIDP)

[troll teaser](https://designerapp.officeapps.live.com/designerapp/Media.ashx/?id=f4f00d1d-7e7f-4801-8a2f-5361fac57dd5.mp4&fileToken=e1b85a99-3bba-46bb-a8be-6142dc022b2a&dcHint=WestEurope)

## Qwik City App ⚡️

- [Qwik Docs](https://qwik.builder.io/)
- [Discord](https://qwik.builder.io/chat)
- [Qwik GitHub](https://github.com/BuilderIO/qwik)
- [@QwikDev](https://twitter.com/QwikDev)
- [Vite](https://vitejs.dev/)
