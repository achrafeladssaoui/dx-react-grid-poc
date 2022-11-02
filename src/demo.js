import React, { Children, useState } from "react";
import Paper from "@mui/material/Paper";
import { TreeDataState, CustomTreeData } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
  TableEditRow,
  TableEditColumn,
  TableRow
} from "@devexpress/dx-react-grid-material-ui";
import { EditingState } from "@devexpress/dx-react-grid";
import { styled } from "@mui/material/styles";

import {
  generateRows,
  defaultColumnValues
} from "../../../demo-data/generator";

const TableHeaderContent = ({
  tableRow,
  children,
  handleButtonClicked,
  ...restProps
}) => (
  <>
    <Table.Row row={tableRow} {...restProps}>
      {children}
    </Table.Row>
    <div style={{ margin: "20px 40px" }}>
      <button onClick={handleButtonClicked}>add group</button>
    </div>
  </>
);

const getRowId = (row) => row.id;

const getChildRows = (row, rootRows) =>
  row ? (row?.isSection ? row.subSections : row.sections) : rootRows;

export default () => {
  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "pricingRules", title: "pricingRules" }
  ]);
  const data = [
    {
      id: 1,
      name: "THALES",
      pricingRules: "RT-THS, RT-FR2, RT-RE6",
      sections: [
        {
          id: 2,
          name: "Pole_RH",
          pricingRules: "RT-THS, RT-FR2",
          isSection: true,
          subSections: [
            {
              id: 4,
              name: "Stagiare",
              pricingRules: "RT-THS, RT-FR2"
            }
          ]
        },
        {
          id: 3,
          name: "Pole_TECH",
          pricingRules: "RT-THS, RT-FR2",
          isSection: true,
          subSections: [
            {
              id: 5,
              name: "Front",
              pricingRules: "RT-THS, RT-FR2"
            },
            {
              id: 6,
              name: "Back",
              pricingRules: "RT-THS, RT-FR2"
            }
          ]
        }
      ]
    }
  ];
  const [tableColumnExtensions] = useState([
    { columnName: "name", width: 300 }
  ]);

  const [defaultAddedRows, setDefaultAddedRows] = useState([]);

  const handleButtonClicked = () => {
    setDefaultAddedRows([
      ...defaultAddedRows,
      {
        id: null,
        name: "",
        pricingRules: ""
      }
    ]);
  };

  console.log("data:", data);

  return (
    <Paper>
      <Grid rows={data} columns={columns} getRowId={getRowId}>
        <TreeDataState />
        <CustomTreeData getChildRows={getChildRows} />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow rowComponent={TableHeaderContent} />
        <TableTreeColumn for="name" />
        <EditingState
          addedRows={defaultAddedRows}
          defaultAddedRows={defaultAddedRows}
        />
        <TableEditRow />
      </Grid>
    </Paper>
  );
};
