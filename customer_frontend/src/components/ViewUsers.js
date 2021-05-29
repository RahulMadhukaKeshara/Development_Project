import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Container } from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';

function createData(user_id, user_type , user_status , user_fname , user_lname , user_contact , user_email , user_address , user_city ,user_postal_code) {
  return { user_id, user_type , user_status , user_fname , user_lname , user_contact , user_email , user_address , user_city ,user_postal_code };
}

const rows = [
  createData('UID1', 'Customer', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID2', 'Customer', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID3', 'Customer', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID4', 'Customer', 'verified', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID5', 'Customer', 'verified', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID6', 'Customer', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID7', 'Delivery Staff', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID8', 'Delivery Staff', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID9', 'Delivery Staff', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  createData('UID10', 'Owner', 'New', 'Rahul', 'Madhuka', '0717947126','rahul@gmail.com', '318/A,Kossinna,Ganemulla', 'Gampaha', '11721'),
  
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'user_id', numeric: true, disablePadding: true, label: 'ID' },
  { id: 'user_type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'user_status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'user_fname', numeric: false, disablePadding: false, label: 'First Name'},
  { id: 'user_lname', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'user_contact', numeric: false, disablePadding: false, label: 'Contact Number' },
  { id: 'user_email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'user_address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'user_city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'user_postal_code', numeric: false, disablePadding: false, label: 'Postal Code' },


];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'center'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          User List
        </Typography>
      )}

      {numSelected === 1 ? (
        <Link href='/update-users'>
        <Tooltip title="Update">
          <IconButton aria-label="update">
            <UpdateIcon/>
          </IconButton>
        </Tooltip>
        </Link>
      ) : (
        <Typography/>
      )}      

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
        <Link href='/add-users'>
        <Tooltip title="Add New User">
          <IconButton aria-label="AddBoxRounded">
            <AddBoxRoundedIcon />
            </IconButton>
        </Tooltip>
        </Link>

        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        </>
      )}

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginTop:theme.spacing(2),
    marginBottom: theme.spacing(2),
    border:'2px solid #f95757',

    
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  user_breadcrumb:{

      marginTop:'85px',
      marginBottom:'10px',
      paddingLeft:'25px',
  },

  user_container:{

    marginTop:'50px',

  },
}));

export default function ViewUsers() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('user_id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.user_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, user_id) => {
    const selectedIndex = selected.indexOf(user_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, user_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const isSelected = (user_id) => selected.indexOf(user_id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (

    <>
      <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.user_breadcrumb}>
        <Link color="inherit" href="/owner-main-page">
          Home
        </Link>
      <Typography color="textPrimary">Users</Typography>
      </Breadcrumbs>
      <Divider />

    <Container className={classes.user_container}>
    
    <h1>Users</h1>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.user_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.user_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.user_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.user_id}
                      </TableCell>
                      <TableCell align="center">{row.user_type}</TableCell>
                      <TableCell align="center">{row.user_status}</TableCell>
                      <TableCell align="center">{row.user_fname}</TableCell>
                      <TableCell align="center">{row.user_lname}</TableCell>
                      <TableCell align="center">{row.user_contact}</TableCell>
                      <TableCell align="center">{row.user_email}</TableCell>
                      <TableCell align="center">{row.user_address}</TableCell>
                      <TableCell align="center">{row.user_city}</TableCell>
                      <TableCell align="center">{row.user_postal_code}</TableCell>

                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

    </div>
    </Container>
    </>
  );
}
