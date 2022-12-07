import * as React from "react";

import { Box, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CustomSearch from "./CustomSearch";
import { CustomTable } from "./CustomTable";
import CustomTag from "./CustomTag";
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
  const [filterWarranty, setFilterWarranty] = useState<boolean | null>(false);
  const [filterContract, setFilterContract] = useState<boolean | null>(null);
  const [activeSearchTags, setActiveSearchTags] = useState<string[]>([
    "serial_number",
  ]);

  useEffect(() => {
    const filteredData = data.filter((dataPoint) => {
      if (filterContract && filterWarranty) {
        return dataPoint.service_contract && dataPoint.warranty;
      } else if (filterContract === null && filterWarranty === null) {
        return dataPoint;
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
      } else if (!filterContract && filterWarranty) {
        return !dataPoint.service_contract && dataPoint.warranty;
      } else if (filterContract && !filterWarranty) {
        return dataPoint.service_contract && !dataPoint.warranty;
      }
      return dataPoint;
    });
    setActiveData(filteredData);
  }, [filterContract, filterWarranty]);

  const [warrantyCount, setWarrantyCount] = useState(activeData.length);
  const [contractCount, setContractCount] = useState(activeData.length);

  useEffect(() => {
    if (filterWarranty) {
      const warranty = activeData.filter((dataPoint) => dataPoint.warranty);
      setWarrantyCount(warranty.length);
    } else {
      const noWarranty = activeData.filter((dataPoint) => !dataPoint.warranty);
      setWarrantyCount(noWarranty.length);
    }
    if (filterContract) {
      const contract = activeData.filter(
        (dataPoint) => dataPoint.service_contract
      );
      setContractCount(contract.length);
    } else {
      const noContract = activeData.filter(
        (dataPoint) => !dataPoint.service_contract
      );
      setContractCount(noContract.length);
    }
  }, [activeData, filterContract, filterWarranty]);

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
  };

  const handleFilterContract = () => {
    setFilterContract(!filterContract);
  };

  return (
    <Box m="4">
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
            filterContract
              ? `${contractCount} contract`
              : `${contractCount} with expired contract`
          }
          onClick={handleFilterContract}
          onClose={() => {
            setFilterContract(null);
          }}
        />
        <CustomTag
          data-testid="warranty-toggle"
          label={
            filterWarranty
              ? `${warrantyCount} warranty`
              : `${warrantyCount} with expired warranty`
          }
          active={filterWarranty}
          onClick={handleFilterWarranty}
          onClose={() => {
            setFilterWarranty(null);
          }}
        />
      </Stack>
      <Divider my="4"></Divider>
      <CustomSearch
        activeSearchTags={activeSearchTags}
        setActiveSearchTags={setActiveSearchTags}
        handleSearch={handleSearch}
      />
      <CustomTable activeData={activeData} />
    </Box>
  );
}
