type icons =
  | "dark"
  | "light"
  | "unchecked"
  | "checked"
  | "remove"
  | "edit"
  | "added"
  | "back"
  | "enter";
interface Props {
  icon: icons;
}

export type { icons, Props };
