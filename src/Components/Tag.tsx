import { Button, Tag, TagCloseButton } from "@chakra-ui/react";

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
      <Button
        variant="ghost"
        _hover={{}}
        _active={{}}
        _focus={{}}
        aria-label="toggle"
        onClick={onClick}
      >
        {label}
      </Button>
      <TagCloseButton aria-label="disable filter" onClick={onClose} />
    </Tag>
  );
};

export default CustomTag;
