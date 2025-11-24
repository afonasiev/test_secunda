type Notes = Note[];
interface Note {
  id: number;
  title: string;
  list: ToDo[];
}
interface ToDo {
  id: number;
  check: boolean;
  name: string;
}

export type { Notes, Note, ToDo };
