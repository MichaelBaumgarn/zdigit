import * as React from "react";

import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

import { Machine } from "./DashBoard";

export interface ICustomCardProps {
  dataPoint: Machine;
}

export default function CustomCard({ dataPoint }: ICustomCardProps) {
  const {
    asset_type,
    customer,
    service_contract,
    warranty,
    serial_number,
    guid,
  } = dataPoint;
  return (
    <div>
      <Card>
        <CardHeader>
          <Heading size="md">Machine Information</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Asset type
              </Heading>
              <Text pt="2" fontSize="sm">
                {asset_type}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Customer
              </Heading>
              <Text pt="2" fontSize="sm">
                {customer}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Service contract
              </Heading>
              <Text pt="2" fontSize="sm">
                {service_contract ? "valid" : "expired"}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Warranty
              </Heading>
              <Text pt="2" fontSize="sm">
                {warranty ? "valid" : "expired"}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Serial number
              </Heading>
              <Text pt="2" fontSize="sm">
                {serial_number}
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Guid
              </Heading>
              <Text pt="2" fontSize="sm">
                {guid}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}
