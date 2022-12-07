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

export type Filter = "ignore" | "valid" | "expired";

export default function DashBoard() {
  const [activeData, setActiveData] = useState(() => [...data]);
  const [filterWarranty, setFilterWarranty] = useState<Filter>("ignore");
  const [filterContract, setFilterContract] = useState<Filter>("expired");

  const [activeSearchTags, setActiveSearchTags] = useState<string[]>([
    "serial_number",
  ]);

  useEffect(() => {
    // Filter logic. Based on toggles, filter data. Users should be able to combine the filters.
    // todo: this should work but is a mess. Redesign this feature in a more elegant way.
    // At the moment this tries to make the toggle hold 3 values.
    // Maybe allow for adding and removing tags, and then the added tags can be toggeled.
    // Maybe this then also allows for this if else to be reduced to something more dynamic
    const filteredData = data.filter((dataPoint) => {
      if (filterContract === "valid" && filterWarranty === "valid") {
        return dataPoint.service_contract && dataPoint.warranty;
      } else if (filterContract === "ignore" && filterWarranty === "ignore") {
        return dataPoint;
      } else if (filterContract === "expired" && filterWarranty === "expired") {
        return !dataPoint.service_contract && !dataPoint.warranty;
      } else if (filterContract === "valid" && filterWarranty === "ignore") {
        return dataPoint.service_contract;
      } else if (filterContract === "expired" && filterWarranty === "ignore") {
        return !dataPoint.service_contract;
      } else if (filterWarranty === "valid" && filterContract === "ignore") {
        return dataPoint.warranty;
      } else if (filterWarranty === "expired" && filterContract === "ignore") {
        return !dataPoint.warranty;
      } else if (filterContract === "expired" && filterWarranty === "valid") {
        return !dataPoint.service_contract && dataPoint.warranty;
      } else if (filterContract === "valid" && filterWarranty === "expired") {
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
    if (filterWarranty === "valid") {
      console.log("valid1");

      const count = activeData.filter((dataPoint) => dataPoint.warranty).length;
      setWarrantyCount(count);
    } else {
      const count = activeData.filter(
        (dataPoint) => !dataPoint.warranty
      ).length;
      console.log("no1", count);
      setWarrantyCount(count);
    }

    // and independently also the count for warranty
    if (filterContract === "valid") {
      const count = activeData.filter(
        (dataPoint) => dataPoint.service_contract
      );
      console.log(
        "valid2",
        count,
        activeData.map((a) => a.service_contract)
      );
      setContractCount(count.length);
    } else {
      console.log("no2");
      const count = activeData.filter(
        (dataPoint) => !dataPoint.service_contract
      ).length;
      setContractCount(count);
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
