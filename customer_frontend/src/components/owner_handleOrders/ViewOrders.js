import React,{useState,useEffect,useParams} from 'react';
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
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';



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
  { id: '_id', numeric: true, disablePadding: true, label: 'Order ID' },
  { id: 'order_User', numeric: false, disablePadding: false, label: 'Ordered Customer' },
  { id: 'payment_Method', numeric: false, disablePadding: false, label: 'Payment Method' },
  { id: 'order_Status', numeric: false, disablePadding: false, label: 'Order Status' },
  { id: 'order_Items', numeric: false, disablePadding: false, label: 'Order Items' },
  { id: 'order_Total', numeric: false, disablePadding: false, label: 'Order Total' },
  { id: 'order_Placed_Date', numeric: false, disablePadding: false, label: 'Order Placed Date' },
  { id: 'delivery_Fname', numeric: false, disablePadding: false, label: 'Order Receiving Person' },
  { id: 'delivery_Contact', numeric: false, disablePadding: false, label: 'Deivery Contact' },
  { id: 'delivery_Address_1', numeric: false, disablePadding: false, label: 'Deivery Address' },
  { id: 'delivery_District', numeric: false, disablePadding: false, label: 'Delivery District' },
  { id: 'delivery_Instructions', numeric: false, disablePadding: false, label: 'Delivery Instructions' },
  { id: 'delivery_Member', numeric: false, disablePadding: false, label: 'Assigned Delivery Member' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort  } = props;
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
            align={headCell.numeric ? 'center' : 'center'}
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
  const { numSelected , onClickDelete , onClickUpdate } = props;


 
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
          Orders List
        </Typography>
      )}

      {numSelected === 1 ? (

        <Tooltip title="Update" onClick={onClickUpdate}>
          <IconButton aria-label="update">
            <UpdateIcon/>
          </IconButton>
        </Tooltip>

      ) : (
        <Typography/>
      )}      

      {numSelected > 1 ? (
        <Typography/>
      ) : (
        <>
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
  onClickDelete:PropTypes.func.isRequired,
  onClickUpdate:PropTypes.func.isRequired
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

  page_title:{
    textAlign:'center',
    marginBottom:50
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

export default function ViewOrders() {

  const history = useHistory()
  const [orders, setOrders] = useState([]);
 // const [search, setSearch] = useState("");

  const getOrdersData = async () => {
    try {
      const data = await Axios.get(
        "http://localhost:5000/orders/"
      );
      //console.log(data.data);
      setOrders(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrdersData();
  }, []);
  

  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('_id');
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
      const newSelecteds = orders.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
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


const handleUpdate = (_id) => {

  history.push(`/owner-view-orderDetails/` + selected.toString(_id));

}

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, orders.length - page * rowsPerPage);

  return (

    <>
      <Breadcrumbs separator="›" aria-label="breadcrumb" className={classes.supplier_breadcrumb}>
        <Link color="inherit" href="/owner-main-page" >
          Home
        </Link>
      <Typography color="textPrimary">Orders</Typography>
      </Breadcrumbs>
      <Divider />

    <Container className={classes.supplier_container}>
    
    <h1 className={classes.page_title}>Orders</h1>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length}  onClickUpdate={handleUpdate}/>
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
              rowCount={orders.length}
            />
            <TableBody>
              {stableSort(orders, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row._id}
                      </TableCell>
                      <TableCell align="center" style={{minWidth:'200px'}}>{row.order_User.user_Fname} {row.order_User.user_Lname}</TableCell>
                      <TableCell align="center" style={{minWidth:'175px'}}>{row.payment_Method}</TableCell>
                      <TableCell align="center" style={{minWidth:'200px'}}>{row.order_Status}</TableCell>
                      <TableCell align="center" style={{minWidth:'250px'}}>
                      {
                            row.order_Items && row.order_Items.map((item ) =>                     
                             <div>{item.product.product_Name}</div>
                            )
                      } 
                      </TableCell>
                      <TableCell align="center">{row.order_Total}</TableCell>
                      <TableCell align="center" style={{minWidth:'200px'}}>{row.order_Placed_Date}</TableCell>
                      <TableCell align="center" style={{minWidth:'200px'}}>{row.delivery_Fname} {row.delivery_Lname}</TableCell>
                      <TableCell align="center" style={{minWidth:'175px'}}>{row.delivery_Contact}</TableCell>
                      <TableCell align="center" style={{minWidth:'300px'}}>{row.delivery_Address_1},{row.delivery_Address_2},{row.delivery_Address_3}</TableCell>
                      <TableCell align="center">{row.delivery_District}</TableCell>
                      <TableCell align="center" style={{minWidth:'300px'}}>{row.delivery_Instructions}</TableCell>
                      <TableCell align="center" style={{minWidth:'200px'}}>{`${row.delivery_Member.user_Fname} ${row.delivery_Member.user_Lname}`}</TableCell>
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
          count={orders.length}
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
