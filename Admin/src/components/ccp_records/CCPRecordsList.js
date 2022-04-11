import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import { injectIntl } from 'react-intl'
import 'moment-timezone'


class TablePaginationActions extends React.Component {
  /**
   * Handle function for click first page button
   */
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  }

  /**
   * Handle function for click back page button
   */
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  /**
   * Handle function for click next page button
   */
  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  /**
   * Handle function for click last page button
   */
  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    )
  }

  /**
   * Render function to view this component
   */
  render() {
    const {classes, count, page, rowsPerPage, theme} = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
        </IconButton>
      </div>
    )
  }
}

/**
 * Set prop types for table pagination actions
 */
TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired
}

/**
 * Component style sheets
 */
const styles = theme => ({
  toolbar: {
    width: '100%',
    margin: 0,
    padding: 0
  },
  tableWrapper: {
    overflowX: 'auto',
    marginTop: theme.spacing(0.5)
  },
  table: {
    minWidth: 300
  },
  title: {
    flex: '0 0 auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  tooltipButton: {
    textAlign: 'left',
    textTransform: 'none'
  },
  noDataCell: {
    textAlign: 'center'
  },
  noMargin: {
    margin: 0
  }
})

const StyledTableCell = withStyles(theme => ({
  head: {
    fontWeight: 'bold',
    color: '#405169',
    textAlign: 'left',
    fontSize: '15px',
    paddingLeft: '4px',
    paddingRight: '4px'
  },
  body: {
    border: 'none',
    '&hover:hover': {
      backgroundColor: '#DDE9FB'
    },
    padding: '4px !important'
  }

}))(TableCell)

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#DDE9FB'
    },
    '&:hover:hover': {
      backgroundColor: '#DDE9FB'
    }
  }
}))(TableRow)

class CCPRecordsList extends Component {

  /**
   * Render function to view this component
   */
  render() {
    const {
      intl,
      classes,
      rows
    } = this.props
    const headers = [
      {
        id: 0,
        title: intl.formatMessage({id: 'table.header.type'})
      },
      {
        id: 1,
        title: intl.formatMessage({id: 'table.header.menu'})
      },
      {
        id: 2,
        title: intl.formatMessage({id: 'table.header.checkMethod'})
      }
    ]
    let index_number = 0
    return (
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {headers.map(header => {
                return (
                  <StyledTableCell className={classes.tableCell} key={header.id}>
                    {header.title}
                  </StyledTableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !rows.length &&
              <StyledTableRow>
                <TableCell colSpan={13} className={classes.noDataCell}>
                  <p className={classes.noMargin}>{intl.formatMessage({id: 'table.noData'})}</p>
                </TableCell>
              </StyledTableRow>
            }
            {rows.map((row, key) => {
              return (
                <>
                  {row.important_management.map((item, index) => {
                    index_number = index_number + 1
                    return (
                      <StyledTableRow key={index_number}>
                        {index === 0 ?
                          <StyledTableCell rowSpan={3} className={`${classes.fontEditable} temperatureColor`}
                                           align="center">
                            {row.bunrui_name}
                          </StyledTableCell>
                          : null}
                        <StyledTableCell className={classes.fontEditable} component="th" align="left">
                          {item.menu_content}
                        </StyledTableCell>
                        <StyledTableCell className={classes.fontEditable} align="left">
                          {item.chk_content}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })}
                </>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(injectIntl(CCPRecordsList))
