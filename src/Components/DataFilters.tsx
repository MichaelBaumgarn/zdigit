import * as React from "react";

import { Heading, Stack, Text } from "@chakra-ui/react";

import CustomTag from "./CustomTag";

export interface IDataFiltersProps {
  filterContract: boolean | null;
  filterWarranty: boolean | null;
  setFilterContract: (val: boolean | null) => void;
  setFilterWarranty: (val: boolean | null) => void;
  contractCount: number;
  warrantyCount: number;
}

export default function DataFilters({
  filterContract,
  setFilterContract,
  setFilterWarranty,
  filterWarranty,
  contractCount,
  warrantyCount,
}: IDataFiltersProps) {
  return (
    <div>
      <Heading mt="4" size="md">
        Filter by:
      </Heading>
      <Text fontSize="sm">Hint: Click on the X to disable the filter</Text>
      <Stack
        direction={["column", "row"]}
        spacing="4"
        alignItems={["flex-start", "center"]}
      >
        <CustomTag
          data-testid="toggle-contract"
          active={filterContract}
          label={
            filterContract
              ? `${contractCount} valid contracts`
              : `${contractCount} expired contracts`
          }
          onClick={() => {
            setFilterContract(!filterContract);
          }}
          onClose={() => {
            setFilterContract(null);
          }}
        />
        <CustomTag
          data-testid="toggle-warranty"
          label={
            filterWarranty
              ? `${warrantyCount} valid warranties`
              : `${warrantyCount} expired warranties`
          }
          active={filterWarranty}
          onClick={() => {
            setFilterWarranty(!filterWarranty);
          }}
          onClose={() => {
            setFilterWarranty(null);
          }}
        />
      </Stack>
    </div>
  );
}
