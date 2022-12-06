import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

import React from "react";

type TCustomTag = {
  label?: string;
  colorScheme?: string;
  active: boolean;
  onClick: () => void;
};

const CustomTag = ({
  label = "test",
  colorScheme = "green",
  active,
  onClick,
  ...rest
}: TCustomTag) => {
  return (
    <Tag
      {...rest}
      size="lg"
      borderRadius="full"
      variant="solid"
      colorScheme={active ? colorScheme : "gray"}
      onClick={onClick}
    >
      <TagLabel>{label}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};

export default CustomTag;
