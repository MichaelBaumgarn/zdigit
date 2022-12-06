import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
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
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>asset type</Th>
              <Th>customer</Th>
              <Th>service_contract</Th>
              <Th>warranty</Th>
              <Th>serial_number</Th>
              <Th>guid</Th>
            </Tr>
          </Thead>
          <Tbody>
            {activeData.map((dp, i) => (
              <Tr data-testid={`row-${i}`} key={i}>
                <Td>{dp.asset_type}</Td>
                <Td data-testid={`col-customer-${i}`}>{dp.customer}</Td>
                <Td>
                  {dp.service_contract
                    ? "service contract"
                    : "no service contract"}
                </Td>
                <Td>{dp.warranty ? "warranty" : "no warranty"}</Td>
                <Td>{dp.serial_number}</Td>
                <Td>{dp.guid}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}
