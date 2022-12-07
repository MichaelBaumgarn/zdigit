import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

import React from "react";

type TCustomTag = {
  label?: string;
  colorScheme?: string;
  active: boolean | null;
  onClick: () => void;
  onClose: () => void;
};

const CustomTag = ({
  label = "test",
  colorScheme = "green",
  active,
  onClick,
  onClose,
  ...rest
}: TCustomTag) => {
  return (
    <Tag
      aria-label={`filter for: ${label}`}
      {...rest}
      size="lg"
      borderRadius="full"
      variant="solid"
      colorScheme={active === null ? "gray" : active ? colorScheme : "red"}
    >
      <TagLabel aria-label="toggle" onClick={onClick}>
        {label}
      </TagLabel>
      <TagCloseButton aria-label="disable filter" onClick={onClose} />
    </Tag>
  );
};

export default CustomTag;
