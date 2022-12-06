import * as React from "react";

import { Box, HStack, Input } from "@chakra-ui/react";

import BarChart from "./BarChart";
import { CustomTable } from "./CustomTable";
import CustomTag from "./Tag";
import data from "./machine_data.json";
import { useState } from "react";

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
  const [filterWarranty, setFilterWarranty] = React.useState(true);
  const [filterContract, setFilterContract] = React.useState(false);

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
    const results = data.filter((dp) => dp.serial_number === e.target.value);
    // const results = findSerialNumber(data, e.target.value);

    setActiveData(results);
  };

  const handleFilterWarranty = () => {
    setFilterWarranty(!filterWarranty);
    setFilterContract(false);
    if (filterWarranty) {
      setActiveData(noWarranty);
    } else {
      setActiveData(warranty);
    }
  };

  const handleFilterContract = () => {
    setFilterContract(!filterContract);
    setFilterWarranty(false);
    if (filterContract) {
      setActiveData(noContract);
    } else {
      setActiveData(contract);
    }
  };
  return (
    <Box m="4">
      <HStack my="4" spacing="4">
        <CustomTag
          data-testid="warranty-toggle"
          label={
            filterWarranty
              ? `${warranty.length} warranty`
              : `${noWarranty.length} have expiered warranty`
          }
          active={filterWarranty}
          onClick={handleFilterWarranty}
        />
        <CustomTag
          active={filterContract}
          label={
            filterContract
              ? `${contract.length} contract`
              : `${noContract.length} have no contract`
          }
          onClick={handleFilterContract}
        />
      </HStack>
      <BarChart warranty={warranty} noWarranty={noWarranty} />
      <Input onChange={handleSearch}></Input>
      <CustomTable activeData={activeData} />
    </Box>
  );
}
