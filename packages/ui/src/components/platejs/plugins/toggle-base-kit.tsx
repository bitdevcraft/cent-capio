import { BaseTogglePlugin } from "@platejs/toggle";

import { ToggleElementStatic } from "../ui/toggle-node-static";
import { BaseIndentKit } from "./indent-base-kit";

export const BaseToggleKit = [
  ...BaseIndentKit,
  BaseTogglePlugin.withComponent(ToggleElementStatic),
];
