import React from "react";
import { useTable } from "react-table";
import { Table as ChakraTable, Tbody, Tr, Th, Td, Thead, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

function Table({ columns, data, onDeleteRow }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <ChakraTable {...getTableProps()} variant='striped' colorScheme='gray'>
      <Thead className='primary'>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
            ))}
            {onDeleteRow && <Th>Delete</Th>}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                const isEditable = cell.column.editable;
                const props = isEditable ? cell.getCellProps({ contentEditable: true }) : cell.getCellProps();
                return <Td {...props}>{cell.render("Cell")}</Td>;
              })}
              {onDeleteRow && (
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteRow(i)}
                  />
                </Td>
              )}
            </Tr>
          );
        })}
      </Tbody>
    </ChakraTable>
  );
}

export default Table; 