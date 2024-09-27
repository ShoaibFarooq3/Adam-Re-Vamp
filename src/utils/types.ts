export type ClaudeMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type MenuToggleButtonProps = {
  open: boolean;
  onClick: () => void;
};
