import {
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
        {activeData.map((dp, i) => (
          <CustomCard key={`card-${i}`} dataPoint={dp}></CustomCard>
        ))}
      </VStack>
      <TableContainer my="4" display={["none", "block", "block", "block"]}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th role="columnheader">Asset type</Th>
              <Th role="columnheader">Customer</Th>
              <Th role="columnheader">Service contract</Th>
              <Th role="columnheader">Warranty</Th>
              <Th role="columnheader">Serial number</Th>
              <Th role="columnheader">Guid</Th>
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
                <Td data-testid={`col-contract-${i}`}>
                  {dp.service_contract ? "valid" : "expired"}
                </Td>
                <Td data-testid={`col-warranty-${i}`}>
                  {dp.warranty ? "valid" : "expired"}
                </Td>
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
