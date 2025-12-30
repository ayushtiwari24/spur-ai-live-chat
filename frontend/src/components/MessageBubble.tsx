type Props = {
  sender: "user" | "ai";
  text: string;
};

export const MessageBubble = ({ sender, text }: Props) => {
  return <div className={`message ${sender}`}>{text}</div>;
};
