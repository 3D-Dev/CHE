import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { injectIntl } from 'react-intl'
import 'moment-timezone'

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

class TemperatureReportList extends Component {

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
        title: intl.formatMessage({id: 'table.header.date'})
      },
      {
        id: 1,
        title: intl.formatMessage({id: 'table.header.equipmentName'})
      },
      {
        id: 2,
        title: intl.formatMessage({id: 'table.header.temperatureDetail'})
      },
      {
        id: 3,
        title: intl.formatMessage({id: 'table.header.temperature'})
      },
      {
        id: 4,
        title: intl.formatMessage({id: 'table.header.confirmer'})
      }
    ]

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
                  {row.data.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        {index === 0 ?
                          <TableCell rowSpan={row.data.length} className={`${classes.fontEditable} temperatureColor`}
                                     align="center">
                            {row.date}日
                          </TableCell>
                          : null}
                        <TableCell className={classes.fontEditable} component="th" align="left">
                          {item.machine_type_input}
                        </TableCell>
                        <TableCell className={classes.fontEditable} align="left">
                          {item.machine_type}
                        </TableCell>
                        <TableCell className={classes.font} align="left">
                          {(item.temperature !== '') ? (item.temperature + '℃') : ''}
                        </TableCell>
                        <TableCell className={classes.font} align="left">
                          {item.confirmer}
                        </TableCell>
                      </TableRow>
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

export default withStyles(styles)(injectIntl(TemperatureReportList))
