import React from "react";

const EmojiPicker = ({ onSelectEmoji }) => {
  const emojis = [
    "😀", "😄", "😆", "😅", "😂",
    "😊", "😇", "😍", "🥰", "😋",
    "😎", "🤩", "🥳", "😏", "😒",
    "😢", "😭", "🤔", "🤯", "😷",
  ];

  return (
    <div className="emoji-picker-container">
      <div className="emoji-picker">
        {emojis.map((emoji, index) => (
          <span
            key={index}
            className="emoji"
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
