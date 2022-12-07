import * as React from "react";

import { Box, Input, Stack, Text } from "@chakra-ui/react";

import { CustomTable } from "./CustomTable";
import CustomTag from "./Tag";
import FuzzySearch from "fuzzy-search";
import data from "./machine_data.json";
import { useEffect } from "react";

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
  const [activeData, setActiveData] = React.useState(() => [...data]);
  const noWarranty = data.filter((dataPoint) => !dataPoint.warranty);
  const warranty = data.filter((dataPoint) => dataPoint.warranty);
  const noContract = data.filter((dataPoint) => !dataPoint.service_contract);
  const contract = data.filter((dataPoint) => dataPoint.service_contract);
  const [filterWarranty, setFilterWarranty] = React.useState<boolean | null>(
    null
  );
  const [filterContract, setFilterContract] = React.useState<boolean | null>(
    null
  );

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
    console.log(e.target.value);
    if (e.target.value === "") {
      setActiveData(data);
      return;
    }
    // how about using common substring data
    // const results = data.filter((dp) => dp.serial_number === e.target.value);
    // const results = findSerialNumber(data, e.target.value);
    const searcher = new FuzzySearch(data, ["serial_number"], {
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
      <Stack direction={["column", "row"]} my="4" spacing="4">
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
      <Text>Search:</Text>
      <Input
        autoFocus
        aria-label={"search-input"}
        onChange={handleSearch}
      ></Input>
      <CustomTable activeData={activeData} />
    </Box>
  );
}
