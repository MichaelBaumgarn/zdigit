import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import { Machine } from "./DashBoard";

export interface ICustomTableProps {
  activeData: Machine[];
}

export function CustomTable({ activeData }: ICustomTableProps) {
  return (
    <div>
      <TableContainer my="4">
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
