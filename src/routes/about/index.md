# Qwick is the new solution?
> create
`pnpm create qwick@lates`

> add tailwind
`pnpm qwik add tailwind`

## Theme 
The theme switching is really easy with this app
just need to edit the root.tsx

```tsx
  <body lang="en" class="dark bg-neutral-800 text-neutral-400">
    {/* ... */}
  </body>
```

## How can I give a right solution for <s>state</s> store handling?

> this will be answer for a stop long process

```ts
  // first implementation 
  
  const STOP_SIGNAL = "stop-signal";
  Promise.any([
    autoplay(store),
    delay(2000).then(() => STOP_SIGNAL)
  ]).then(() => 
    {throw new Error(STOP_SIGNAL);}
  ).catch((error) => {
    reset(store);
    console.log('--- signal is catched ---', error)
  })
```