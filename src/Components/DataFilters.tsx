import * as React from "react";

import { Heading, Stack, Text } from "@chakra-ui/react";

import CustomTag from "./CustomTag";
import { Filter } from "./DashBoard";

export interface IDataFiltersProps {
  filterContract: Filter;
  filterWarranty: Filter;
  setFilterContract: (val: Filter) => void;
  setFilterWarranty: (val: Filter) => void;
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
        Sorty by:
      </Heading>
      <Text>Click on the X to disregard the filter</Text>
      <Stack
        direction={["column", "row"]}
        my="4"
        spacing="4"
        alignItems={["flex-start", "center"]}
      >
        <CustomTag
          data-testid="toggle-contract"
          active={filterContract}
          label={
            filterContract === "valid"
              ? `${contractCount} valid contracts`
              : `${contractCount} expired contracts`
          }
          onClick={() => {
            setFilterContract(filterContract === "valid" ? "expired" : "valid");
          }}
          onClose={() => {
            setFilterContract("ignore");
          }}
        />
        <CustomTag
          data-testid="toggle-warranty"
          label={
            filterWarranty === "valid"
              ? `${warrantyCount} valid warranties`
              : `${warrantyCount} expired warranties`
          }
          active={filterWarranty}
          onClick={() => {
            setFilterWarranty(filterWarranty === "valid" ? "expired" : "valid");
          }}
          onClose={() => {
            setFilterWarranty("ignore");
          }}
        />
      </Stack>
    </div>
  );
}
