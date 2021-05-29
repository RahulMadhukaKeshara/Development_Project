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

function createData(product_id, product_name, product_category, product_qty, product_col ,product_size, product_img , prodct_price,prodct_discount, product_re_level, product_re_qty, product_published, product_new,product_featured) {
  return { product_id, product_name, product_category, product_qty, product_col ,product_size, product_img , prodct_price,prodct_discount, product_re_level, product_re_qty, product_published, product_new,product_featured };
}

const rows = [
  createData('PID1', 'Butterfly Neck', 'Women', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID2', 'Butterfly Neck', 'Women', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID3', 'Butterfly Neck', 'Women', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID4', 'Butterfly Neck', 'Women', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID5', 'Butterfly Neck', 'Men', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID6', 'Butterfly Neck', 'Men', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID7', 'Butterfly Neck', 'Men', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
  createData('PID8', 'Butterfly Neck', 'Men', '15', '-', 'S , M','-', '900.00', '30', '05', '15', 'yes', 'new', 'yes'),
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
  { id: 'product_id', numeric: true, disablePadding: true, label: 'Product ID' },
  { id: 'product_name', numeric: false, disablePadding: false, label: 'Product Name' },
  { id: 'product_category', numeric: false, disablePadding: false, label: 'Product Category' },
  { id: 'product_qty', numeric: false, disablePadding: false, label: 'Quantity' },
  { id: 'product_col', numeric: false, disablePadding: false, label: 'Colors' },
  { id: 'product_size', numeric: false, disablePadding: false, label: 'Sizes' },
  { id: 'product_img', numeric: false, disablePadding: false, label: 'Images' },
  { id: 'prodct_price', numeric: false, disablePadding: false, label: 'Price(LKR.)' },
  { id: 'prodct_discount', numeric: false, disablePadding: false, label: 'Discount(%)' },
  { id: 'product_re_level', numeric: false, disablePadding: false, label: 'Reorder Level' },
  { id: 'product_re_qty', numeric: false, disablePadding: false, label: 'Reorder Quantity' },
  { id: 'product_published', numeric: false, disablePadding: false, label: 'Published' },
  { id: 'product_new', numeric: false, disablePadding: false, label: 'New' },
  { id: 'product_featured', numeric: false, disablePadding: false, label: 'Featured' },
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
          Product List
        </Typography>
      )}

      {numSelected === 1 ? (
        <Link href='/update-products'>
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
        <Link href='/add-products'>
        <Tooltip title="Add New Product">
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
  supplier_breadcrumb:{

      marginTop:'85px',
      marginBottom:'10px',
      paddingLeft:'25px',
  },

  supplier_container:{

    marginTop:'50px',

  },
}));

export default function ViewProducts() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('product_id');
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
      const newSelecteds = rows.map((n) => n.product_id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, product_id) => {
    const selectedIndex = selected.indexOf(product_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, product_id);
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



  const isSelected = (product_id) => selected.indexOf(product_id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (

    <>
      <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.supplier_breadcrumb}>
        <Link color="inherit" href="/owner-main-page" >
          Home
        </Link>
      <Typography color="textPrimary">Suppliers</Typography>
      </Breadcrumbs>
      <Divider />

    <Container className={classes.supplier_container}>
    
    <h1>Products</h1>
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
                  const isItemSelected = isSelected(row.product_id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.product_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.product_id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.product_id}
                      </TableCell>
                      <TableCell align="center">{row.product_name}</TableCell>
                      <TableCell align="center">{row.product_category}</TableCell>
                      <TableCell align="center">{row.product_qty}</TableCell>
                      <TableCell align="center">{row.product_col}</TableCell>
                      <TableCell align="center">{row.product_size}</TableCell>
                      <TableCell align="center">{row.product_img}</TableCell>
                      <TableCell align="center">{row.prodct_price}</TableCell>
                      <TableCell align="center">{row.prodct_discount}</TableCell>
                      <TableCell align="center">{row.product_re_level}</TableCell>
                      <TableCell align="center">{row.product_re_qty}</TableCell>
                      <TableCell align="center">{row.product_published}</TableCell>
                      <TableCell align="center">{row.product_new}</TableCell>
                      <TableCell align="center">{row.prodct_discount}</TableCell>
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
