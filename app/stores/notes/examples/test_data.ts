import type { Notes } from "../types";

export const notesData: Notes = [
  {
    id: 1,
    title: "test1",
    list: [
      {
        id: 1,
        check: false,
        name: "test 1",
      },
      {
        id: 2,
        check: true,
        name: "test 2",
      },
      {
        id: 3,
        check: false,
        name: "test 3",
      },
    ],
  },
  {
    id: 2,
    title: "test2",
    list: [
      {
        id: 1,
        check: true,
        name: "test 1",
      },
      {
        id: 2,
        check: false,
        name: "test 2",
      },
      {
        id: 3,
        check: false,
        name: "test 3",
      },
      {
        id: 4,
        check: false,
        name: "test 4",
      },
    ],
  },
  {
    id: 3,
    title: "test3",
    list: [
      {
        id: 1,
        check: true,
        name: "test 1",
      },
    ],
  },
];
