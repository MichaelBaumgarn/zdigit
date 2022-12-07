import * as React from "react";

import { Heading, Input, Stack, Text } from "@chakra-ui/react";

import CustomTag from "./CustomTag";

export interface ICustomSearchProps {
  activeSearchTags: string[];
  setActiveSearchTags: (val: string[]) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomSearch({
  activeSearchTags,
  setActiveSearchTags,
  handleSearch,
}: ICustomSearchProps) {
  return (
    <div aria-label="search area">
      <Heading size="md">Search by text based on the selected filters:</Heading>
      <Text fontSize="sm">
        Hint: You can select multiple columns at once but make sure at least one
        is selected. Your text search will be compared against the selected
        columns.
      </Text>
      <Stack
        direction={["column", "row"]}
        my="2"
        spacing="2"
        flexWrap="wrap"
        alignItems={["flex-start", "center"]}
      >
        {["serial_number", "customer", "asset_type", "id", "guid"].map(
          (searchColumn, i) => (
            <CustomTag
              key={`search-${i}`}
              label={searchColumn}
              active={
                Boolean(activeSearchTags.find((tag) => tag === searchColumn))
                  ? "valid"
                  : "ignore"
              }
              onClick={() => {
                const inList = activeSearchTags.find(
                  (tag) => tag === searchColumn
                );
                if (!inList) {
                  const newActiveSearchTags = [...activeSearchTags];
                  newActiveSearchTags.push(searchColumn);
                  setActiveSearchTags(newActiveSearchTags);
                } else if (activeSearchTags.length > 1) {
                  const newActiveSearchTags = activeSearchTags.filter(
                    (tag) => tag !== searchColumn
                  );
                  setActiveSearchTags(newActiveSearchTags);
                }
              }}
            />
          )
        )}
      </Stack>
      <label>
        Search:
        <Input
          autoFocus
          aria-label="search-input"
          data-testid="search-input"
          onChange={handleSearch}
          placeholder="for example 2704..."
        ></Input>
      </label>
    </div>
  );
}
