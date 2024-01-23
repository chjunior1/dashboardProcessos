'use client';
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as database from "./hearings.json"

const api = require("axios");
const localizedFormat = require('dayjs/plugin/localizedFormat')
dayjs.extend(localizedFormat)

type DataTable = {
  processNumber: string;
  date: string;
  court: string;
  correspondent: string;
}[];

function Demo() {
  const [dataTable, setDataTable] = useState<DataTable>([]);
  
  useEffect(() => {
    api
    .get("http://localhost:3000/json")
    .then((response: any) => {
      setDataTable(Object.values(response.data));
    })
    .catch((error: any) => {
      console.log(error);
      console.log("tivemos um problema ao acessar a API. utilizaremos fonte de dados local!!");
      setDataTable(Object.values(database));
    })
  }, []);

  const rows = dataTable!.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td>{element.processNumber}</Table.Td>
      <Table.Td>{dayjs(element.date).format('L')}</Table.Td>
      <Table.Td>{dayjs(element.date).format('LTS')}</Table.Td>
      <Table.Td>{element.court}</Table.Td>
      <Table.Td>{element.correspondent}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table stickyHeader stickyHeaderOffset={0} striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Número do Processo</Table.Th>
          <Table.Th>Data</Table.Th>
          <Table.Th>Hora</Table.Th>
          <Table.Th>Comarca</Table.Th>
          <Table.Th>Correspondente</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

export default Demo;
