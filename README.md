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

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `pnpm build.server` and `pnpm build.client`:

```shell
pnpm build
```

[Read the full guide here](https://github.com/BuilderIO/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
pnpm deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.
