import { Button, Tag, TagCloseButton, Text } from "@chakra-ui/react";

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
      my="4"
      maxH="30"
      aria-label={`filter for: ${label}`}
      {...rest}
      size="lg"
      borderRadius="full"
      variant="solid"
      colorScheme={active === null ? "gray" : active ? colorScheme : "red"}
      minW="100"
      whiteSpace="nowrap"
      overflow="hidden"
    >
      <Button
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
      <TagCloseButton aria-label="disable filter" onClick={onClose} />
    </Tag>
  );
};

export default CustomTag;
