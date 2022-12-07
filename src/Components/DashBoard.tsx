import * as React from "react";

import { Box, Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CustomSearch from "./CustomSearch";
import { CustomTable } from "./CustomTable";
import DataFilters from "./DataFilters";
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
    // how about using common substring data
    // const results = data.filter((dp) => dp.serial_number === e.target.value);
    // const results = findSerialNumber(data, e.target.value);

    if (e.target.value === "") {
      setActiveData(data);
      return;
    }
    const searcher = new FuzzySearch(data, activeSearchTags, {
      caseSensitive: false,
    });
    const results = searcher.search(e.target.value);
    setActiveData(results);
  };

  return (
    <Box m="4">
      <DataFilters
        filterContract={filterContract}
        filterWarranty={filterWarranty}
        setFilterContract={setFilterContract}
        setFilterWarranty={setFilterWarranty}
        contractCount={contractCount}
        warrantyCount={warrantyCount}
      />
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
