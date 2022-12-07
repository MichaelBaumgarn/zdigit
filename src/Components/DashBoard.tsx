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

  // could be an enum
  const [activeSearchTags, setActiveSearchTags] = useState<string[]>([
    "serial_number",
  ]);

  useEffect(() => {
    // Filter logic. Based on toggles, filter data. Users should be able to combine the filters.
    // todo: this should work but is a mess. Redesign this feature in a more elegant way.
    // at the moment this tried to make the toggle hold 3 values, null for ignore, true for valid, and false for expired.
    // But thats an anitpatter and not good.
    // Maybe allow for adding and removing tags, and then the added tags can be toggeled.
    // Maybe this then also allows for this if else to be reduced to something more dynamic
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
    // find out count for warranty
    if (filterWarranty) {
      const warranty = activeData.filter((dataPoint) => dataPoint.warranty);
      setWarrantyCount(warranty.length);
    } else {
      const noWarranty = activeData.filter((dataPoint) => !dataPoint.warranty);
      setWarrantyCount(noWarranty.length);
    }

    // and independently also the count for warranty
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // todo: build your own search function
    // maybe longest common substring?
    // maybe something with levenshtein distance

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
