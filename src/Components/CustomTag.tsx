import { Button, Tag, TagCloseButton, Text } from "@chakra-ui/react";

import { FilterValue } from "./DashBoard";

type TCustomTag = {
  label?: string;
  colorScheme?: string;
  active: FilterValue;
  onClick: () => void;
  onClose?: () => void | undefined;
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
      my={["", "4"]}
      maxH="30"
      aria-label={`filter for: ${label}`}
      size="lg"
      borderRadius="full"
      variant="solid"
      colorScheme={
        active === "ignore" ? "gray" : active === "valid" ? colorScheme : "red"
      }
      minW="100"
      whiteSpace="nowrap"
      overflow="hidden"
    >
      <Button
        {...rest}
        variant="ghost"
        _hover={{}}
        _active={{}}
        _focus={{}}
        aria-label="toggle"
        onClick={onClick}
      >
        <Text whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
          {label}
        </Text>
      </Button>
      {onClose && (
        <TagCloseButton aria-label="disable filter" onClick={onClose} />
      )}
    </Tag>
  );
};

export default CustomTag;
