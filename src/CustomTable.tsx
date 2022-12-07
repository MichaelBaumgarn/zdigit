import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";

import CustomCard from "./CustomCard";
import { Machine } from "./DashBoard";

export interface ICustomTableProps {
  activeData: Machine[];
}

export function CustomTable({ activeData }: ICustomTableProps) {
  return (
    <div>
      <VStack spacing="4" my="4" display={["", "", "", "none"]}>
        {activeData.map((dp) => (
          <CustomCard dataPoint={dp}></CustomCard>
        ))}
      </VStack>
      <TableContainer my="4" display={["none", "block", "block", "block"]}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th role="columnheader">asset type</Th>
              <Th role="columnheader">customer</Th>
              <Th role="columnheader">service_contract</Th>
              <Th role="columnheader">warranty</Th>
              <Th role="columnheader">serial_number</Th>
              <Th role="columnheader">guid</Th>
            </Tr>
          </Thead>
          <Tbody role="grid">
            {activeData.map((dp, i) => (
              <Tr
                data-testid={`row-${i}`}
                key={i}
                role="row"
                aria-rowindex={i + 1}
              >
                <Td>{dp.asset_type}</Td>
                <Td data-testid={`col-customer-${i}`}>{dp.customer}</Td>
                <Td>{dp.service_contract ? "valid" : "expired"}</Td>
                <Td>{dp.warranty ? "valid" : "expired"}</Td>
                <Td>{dp.serial_number}</Td>
                <Td>{dp.guid}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
