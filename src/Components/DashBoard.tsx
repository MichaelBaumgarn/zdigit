import * as React from "react";

import { Box, Divider, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CustomSearch from "./CustomSearch";
import { CustomTable } from "./CustomTable";
import CustomTag from "./Tag";
import FuzzySearch from "fuzzy-search";
import data from "../machine_data.json";

export type Machine = {
  id: number;
  guid: string;
  customer: string;
  asset_type: string;
  serial_number: string;
  service_contract: boolean;
  warranty: boolean;
};

export default function DashBoard() {
  const [activeData, setActiveData] = useState(() => [...data]);
  const noWarranty = data.filter((dataPoint) => !dataPoint.warranty);
  const warranty = data.filter((dataPoint) => dataPoint.warranty);
  const noContract = data.filter((dataPoint) => !dataPoint.service_contract);
  const contract = data.filter((dataPoint) => dataPoint.service_contract);
  const [filterWarranty, setFilterWarranty] = useState<boolean | null>(null);
  const [filterContract, setFilterContract] = useState<boolean | null>(null);
  const [activeSearchTags, setActiveSearchTags] = useState<string[]>([
    "serial_number",
  ]);

  useEffect(() => {
    const filteredData = data.filter((dataPoint) => {
      if (filterContract && filterWarranty) {
        return dataPoint.service_contract && dataPoint.warranty;
      } else if (!filterContract && !filterWarranty) {
        return !dataPoint.service_contract && !dataPoint.warranty;
      } else if (filterContract && filterWarranty === null) {
        return dataPoint.service_contract;
      } else if (!filterContract && filterWarranty === null) {
        return !dataPoint.service_contract;
      } else if (filterWarranty && filterContract === null) {
        return dataPoint.warranty;
      } else if (!filterWarranty && filterContract === null) {
        return !dataPoint.warranty;
      }
      return data;
    });
    setActiveData(filteredData);
  }, [filterContract, filterWarranty]);

  // const findSerialNumber = (data: Machine[], searchTerm: string): Machine[] => {
  //   const searchValues = searchTerm.split("");
  //   console.log(searchValues);
  //   for (let i = 0; i < searchValues.length; i++) {
  //     const letter = searchValues[i];

  //   }
  //   return [];
  // };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setActiveData(data);
      return;
    }
    // how about using common substring data
    // const results = data.filter((dp) => dp.serial_number === e.target.value);
    // const results = findSerialNumber(data, e.target.value);
    const searcher = new FuzzySearch(data, activeSearchTags, {
      caseSensitive: false,
    });
    const results = searcher.search(e.target.value);
    setActiveData(results);
  };

  const handleFilterWarranty = () => {
    setFilterWarranty(!filterWarranty);
    if (filterWarranty) {
      setActiveData(noWarranty);
    } else {
      setActiveData(warranty);
    }
  };

  const handleFilterContract = () => {
    setFilterContract(!filterContract);
    if (filterContract) {
      setActiveData(noContract);
    } else {
      setActiveData(contract);
    }
  };

  return (
    <Box m="4">
      <Divider></Divider>
      <Heading mt="4" size="md">
        Sorty by:
      </Heading>
      <Stack
        direction={["column", "row"]}
        my="4"
        spacing="4"
        alignItems="center"
      >
        <CustomTag
          active={filterContract}
          label={
            filterContract
              ? `${contract.length} contract`
              : `${noContract.length} have no contract`
          }
          onClick={handleFilterContract}
          onClose={() => {
            console.log("close");
            setFilterContract(null);
          }}
        />
        <CustomTag
          data-testid="warranty-toggle"
          label={
            filterWarranty
              ? `${warranty.length} warranty`
              : `${noWarranty.length} have expiered warranty`
          }
          active={filterWarranty}
          onClick={handleFilterWarranty}
          onClose={() => {
            console.log("close");

            setFilterWarranty(null);
          }}
        />
      </Stack>
      <CustomSearch
        activeSearchTags={activeSearchTags}
        setActiveSearchTags={setActiveSearchTags}
        handleSearch={handleSearch}
      />
      <CustomTable activeData={activeData} />
    </Box>
  );
}
