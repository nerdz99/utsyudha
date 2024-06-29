// src/components/Grid/constants.ts
export const grids = [
  [
    { top: 3, left: 3 },
    { top: 3, alignSelf: 'center' },
    { top: 3, right: 3, alignSelf: 'flex-end' },
  ],
  [
    { left: 3, justifyContent: 'center', alignSelf: 'flex-start' },
    undefined,
    { right: 3, justifyContent: 'center', alignSelf: 'flex-end' },
  ],
  [
    { bottom: 3, left: 3, justifyContent: 'flex-end' },
    { bottom: 3, alignSelf: 'center', justifyContent: 'flex-end' },
    {
      bottom: 3,
      right: 3,
      alignSelf: 'flex-end',
      justifyContent: 'flex-end',
    },
  ],
];
