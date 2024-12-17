import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import Chance from 'chance';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

enum Status {
  RANOUT = 'RANOUT',
  HAVE = 'HAVE',
}

enum Priority {
  HIGH = 1,
  MEDIUM = 2,
  LOW = 3,
  LOWEST = 4,
  NONE = 5,
}

interface Data {
  id: number;
  name: string;
  quantity: number;
  status: Status;
  priority: Priority;
  lastStatusChanged: string;
}

interface ColumnData {
  dataKey: keyof Data | 'actions';
  label: string;
  numeric?: boolean;
  width?: number;
}

const chance = new Chance(42);

function createData(id: number): Data {
  return {
    id,
    name: `${chance.first()} ${chance.last()}`,
    quantity: chance.integer({ min: 1, max: 100 }),
    status: chance.pickone([Status.RANOUT, Status.HAVE]),
    priority: chance.integer({ min: Priority.HIGH, max: Priority.NONE }),
    lastStatusChanged: chance.date({ year: 2023 }).toLocaleDateString(),
  };
}

const columns: ColumnData[] = [
  {
    width: 100,
    label: 'Name',
    dataKey: 'name',
  },
  {
    width: 50,
    label: 'Quantity',
    dataKey: 'quantity',
  },
  {
    width: 50,
    label: 'Status',
    dataKey: 'status',
    numeric: true,
  },
  {
    width: 50,
    label: 'Priority',
    dataKey: 'priority',
  },
  {
    width: 100,
    label: 'Last Status Changed',
    dataKey: 'lastStatusChanged',
  },
  {
    width: 50,
    label: 'Actions',
    dataKey: 'actions',
  },
];

const rows: Data[] = Array.from({ length: 200 }, (_, index) =>
  createData(index),
);

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }}
    />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width, fontWeight: 'bold' }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {column.dataKey === 'actions' ? (
            <div>
              <IconButton
                style={{ color: 'black' }}
                onClick={() => console.log(`Edit ${row.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                style={{ color: 'black' }}
                onClick={() => console.log(`Delete ${row.id}`)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ) : column.dataKey === 'priority' ? (
            Object.keys(Priority).find(
              (key) => Priority[key as keyof typeof Priority] === row.priority
            )
          ) : column.dataKey === 'status' ? (
            row.status
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 'calc(100vh - 128px)', width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}