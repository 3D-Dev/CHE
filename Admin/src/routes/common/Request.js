import React, { Component } from 'react'
import {FormattedMessage, injectIntl} from 'react-intl'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {Button, Card, Form, Input, Layout, Spin} from 'antd'
import {initSettings, setRole} from '../../appRedux/actions/User'
import {getRequestList, getUserList, select} from '../../api/axiosAPIs'
import { COPYRIGHT_COMPANY } from '../../constants/AppConfigs'
import _ from "lodash";
import {CSVLink} from "react-csv";
import {UserList} from "../../components";
import {setTitleText} from "../../appRedux/actions/Custom";
import RequestList from "../../components/users/RequestList";

const {Footer} = Layout

class Request extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: false,
      selectedItemId: null,
      rows: [],
      count: 0,
      page: 0,
      rowsPerPage: 5,
      rowsPerPageOptions: [5, 10, 20, 50, 100, 500],
      asc: 'desc',
      keyword: '',
      downloadRows: []
    }
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `menu.title.users`}))

    let {pageNumberState, rowsPerPageState} = this.props.location
    const {page, rowsPerPage} = this.state
    let data = {
      page: page,
      limit: rowsPerPage
    }
    if ((pageNumberState !== undefined) && (rowsPerPageState !== undefined)) {
      data = {
        page: pageNumberState,
        limit: rowsPerPageState
      }
      this.setState({
        page: pageNumberState,
        rowsPerPage: rowsPerPageState
      })
    }
    this.fetchUserList(data)
  }

  fetchUserList(data) {
    const {asc, keyword} = this.state

    let params = {
      asc: asc,
      keyword: keyword
    }
    Object.assign(params, data)
    getRequestList(params)
        .then(response => {
          if (!_.isEmpty(response.data)) {
            if (response.data.data) {
              this.setState({
                count: response.data.total,
                rows: response.data.data
              })
            } else {
              //this.props.initSettings()
              //this.props.history.push('/admin/login')
            }
          }
        })
  }

  handleChangePage = (event, page) => {
    const {rowsPerPage, asc, keyword} = this.state
    const data = {
      page: page,
      limit: rowsPerPage,
      asc: asc,
      keyword: keyword
    }
    getRequestList(data)
        .then(response => {
          if (!_.isEmpty(response.data)) {
            this.setState({
              page: page,
              count: response.data.total,
              rows: response.data.data
            })
          }
        })
  }

  handleChangeRowsPerPage = (event) => {
    const {asc, keyword} = this.state
    const data = {
      page: 0,
      limit: event.target.value,
      asc: asc,
      keyword: keyword
    }

    getRequestList(data)
        .then(response => {
          if (!_.isEmpty(response.data)) {
            this.setState({
              page: 0,
              rowsPerPage: event.target.value,
              count: response.data.total,
              rows: response.data.data
            })
          }
        })
  }

  onChangeKeyword = e => {
    this.setState({
      keyword: e.target.value
    })
  }

  /**
   * Handle function for deny members
   */
  onClickSearchButton = () => {
    let data = {
      page: this.state.page,
      limit: this.state.rowsPerPage
    }
    this.fetchUserList(data)
  }


  render() {
    const {
      loader,
      rows,
      count,
      page,
      rowsPerPage,
      rowsPerPageOptions
    } = this.state
    const {profile} = this.props
    return (
        <div>
          <div className="gx-flex-row gx-align-items-center gx-mb-4">
            <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage id="menu.title.users"/></h2>
          </div>
          <Card className="gx-card">
            <Spin spinning={loader} size="large">
              <div className="gx-flex-row gx-align-items-center gx-mb-4">
                <div
                    className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                  <div
                      className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-12 ant-col-xxl-8 gx-no-padding">
                  </div>
                </div>
              </div>
              <RequestList
                  rows={rows}
                  count={count}
                  page={page}
                  rowsPerPage={rowsPerPage}
                  rowsPerPageOptions={rowsPerPageOptions}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  onClickDeleteButton={this.onClickDeleteButton}
                  onClickEditButton={this.onClickEditButton}
                  onClickGoStoreLogin={this.onClickGoStoreLogin}
              />
            </Spin>
          </Card>
        </div>
    )
  }
}

const mapDispatchToProps = {
  setRole, initSettings, setTitleText
}

const mapStateToProps = ({progress}) => {
  return {
    loader: progress.loader
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Request))

