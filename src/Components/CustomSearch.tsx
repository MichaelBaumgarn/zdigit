import * as React from "react";

import { Heading, Input, Stack } from "@chakra-ui/react";

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
      <Heading size="md">Search filters:</Heading>
      <Stack
        direction={["column", "row"]}
        my="2"
        spacing="2"
        flexWrap="wrap"
        alignItems="center"
      >
        {["serial_number", "customer", "asset_type", "id", "guid"].map(
          (searchColumn, i) => (
            <CustomTag
              key={`search-${i}`}
              label={searchColumn}
              active={
                Boolean(activeSearchTags.find((tag) => tag === searchColumn))
                  ? true
                  : null
              }
              onClick={() => {
                if (!activeSearchTags.find((tag) => tag === searchColumn)) {
                  const newActiveSearchTags = [...activeSearchTags];
                  newActiveSearchTags.push(searchColumn);
                  setActiveSearchTags(newActiveSearchTags);
                }
              }}
              onClose={() => {
                if (activeSearchTags.length > 1) {
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
        ></Input>
      </label>
    </div>
  );
}
