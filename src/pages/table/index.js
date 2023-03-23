import {
  Box,
  Button,
  Flex,
  Spacer,
  Heading,
  Stack,
  Input,
  Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import Table from "../../components/Table";

const TablePage = () => {
  const [columns, setColumns] = useState([
    {
      Header: "Name",
      accessor: "name",
      editable: true,
    },
    {
      Header: "Age",
      accessor: "age",
      editable: true,
    },
    {
      Header: "Gender",
      accessor: "gender",
      editable: true,
    },
  ]);

  const [data, setData] = useState([
    {
      name: "Soleh Solihun",
      age: 28,
      gender: "Male",
    },
    {
      name: "Ebel Cobra",
      age: 26,
      gender: "Female",
    },
  ]);

  const handleAddRow = () => {
    setData(prevData => [...prevData, { name: "", age: 0, gender: "" }]);
  };

  const handleDeleteRow = index => {
    setData(prevData => [...prevData.slice(0, index), ...prevData.slice(index + 1)]);
  };

  const [newColumnNumber, setNewColumnNumber] = useState("");
  const [newColumnHeader, setNewColumnHeader] = useState("");

  const handleAddColumn = () => {
    const newColumn = {
      Header: newColumnHeader,
      accessor: `col${newColumnNumber}`,
      editable: true,
    };
    setColumns(prevColumns => [...prevColumns, newColumn]);
    setData(prevData =>
      prevData.map(row => ({
        ...row,
        [`col${newColumnNumber}`]: "",
      }))
    );
    setNewColumnNumber("");
    setNewColumnHeader("");
  };

  return (
    <div>
      <Heading ml={4} mb={4} size='md' as='h1'>
        Table 4.0
      </Heading>
      <Box p={4} w='50%'>
        <Text fontSize='lg' mb={3}>Konfigurasi Kolom Table</Text>
        <Stack spacing={4}
        >
          <Input
            placeholder="Nomor Kolom"
            value={newColumnNumber}
            onChange={e => setNewColumnNumber(e.target.value)}
          />
          <Input
            placeholder="Nama Header"
            value={newColumnHeader}
            onChange={e => setNewColumnHeader(e.target.value)}
          />
          <Button rightIcon={<AddIcon />} colorScheme='blue' icon={<AddIcon />}
            size="md"
            isDisabled={!newColumnNumber || !newColumnHeader}
            onClick={handleAddColumn}>
            Tambah Kolom
          </Button>
        </Stack>
      </Box>
      <Box p={4}>
        <Flex>
          <Box p='4'>
            <Heading size='md' as='h1'>
              Table
            </Heading>
          </Box>
          <Spacer />
          <Box p='4'>
            <Button rightIcon={<AddIcon />} colorScheme='blue' icon={<AddIcon />}
              size="md"
              onClick={handleAddRow}>
              Tambah Row
            </Button>
          </Box>
        </Flex>
        <Table columns={columns} data={data} onDeleteRow={handleDeleteRow} />
      </Box >
    </div >
  );
};

export default TablePage;

