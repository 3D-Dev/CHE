import React, {useState} from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { UserList } from '../../../components'
import { FormList } from "../../../components/form/FormList"
import { CSVLink } from 'react-csv'
import {getUserList, getDownloadList, loginCustomerFromUser, addRequest} from '../../../api/axiosAPIs'
import _ from 'lodash'
import PageConstant from '../../../constants/PageConstant'
import { Button, Card, Input, Spin } from 'antd'
import { initSettings, setRole } from '../../../appRedux/actions/User'
import { setTitleText } from '../../../appRedux/actions/Custom'
import {HTTP_SUCCESS} from "../../../constants/ResponseCode";
import {openNotificationWithIcon} from "../../../components/common/Messages";
import { userPublic } from '../../../api/axiosAPIs'
import AuthVerify from '../../../components/common/AuthVerify'
class Users extends React.Component {
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
      btnActive: true,
      downloadRows: [],
      filterKey: ''
    }
    this.csvLink = React.createRef()
  }

  componentDidMount() {
    const {intl} = this.props
    this.props.setTitleText(intl.formatMessage({id: `page.title.users`}))

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
    console.log('componentDidMount')
    this.fetchUserList(data)
    this.timer = setInterval(()=>this.fetchUserList(), 30000)

  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const {loader} = nextProps
    if (loader !== this.state.loader) {
      this.setState({loader})
    }
  }

  fetchUserList(data) {
    const {asc, keyword, filterKey} = this.state

    let params = {
      asc: asc,
      keyword: keyword,
      filterKey: filterKey
    }
    Object.assign(params, data)
    getUserList(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          if (response.data.data) {
            console.log('fetchUserList')
            this.setState({
              count: response.data.total,
              rows: response.data.data
            })
            const data = JSON.stringify(response.data)
            if(JSON.parse(data).request.length > 0) {
              const request = JSON.parse(data).request[0].status
              switch (request) {
                case 0:
                case 1:
                  this.setState({btnActive: true})
                  clearInterval(this.timer)
                  break
                case 2:
                  this.setState({btnActive: false})
                  break
              }
            }
          } else {
            //this.props.initSettings()
            //this.props.history.push('/admin/login')
          }
        }
      })
  }

  handleChangeAllowStatus = (isPublic, id) => {
    isPublic = !isPublic
    userPublic(id, {isPublic: isPublic})
      .then(response => {
        if(response.status == 200) {
          const {rows} = this.state
          const row = rows.find(item => item.id === id)
          row.isPublic = isPublic
          this.setState(
            {rows: rows}
          )
          console.log('userPublic_changed!!!!')
        }
        else {
          console.log('userPublic_NOT changed!!!!')
        }
      })
  }

  fetchCSVData() {
    const {asc, keyword} = this.state

    let params = {
      asc: asc,
      keyword: keyword
    }

    getDownloadList(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          this.setState({downloadRows: response.data.data}, () => {
            // click the CSVLink component to trigger the CSV download
            this.csvLink.current.link.click()
          })
        }
      })
  }

  getItemCSVWithName() {
    return [
      { label: 'ID', key: "id" },
      { label: 'ユーザー名', key: "name" },
      { label: 'メールアドレス', key: "email" },
      { label: '入金アドレス', key: "account" },
      { label: 'クラブID', key: "referId" },
      { label: 'クラブ名', key: "companyName" },
      { label: '補償額', key: "totalDistribution" },
      { label: '報酬開始日', key: "createdAt" },
      { label: '最終更新日', key: "updatedAt" },
    ];
  };

  /**
   * Handle function for change page
   */
  handleChangePage = (event, page) => {
    const {rowsPerPage, asc, keyword, filterKey} = this.state
    const data = {
      page: page,
      limit: rowsPerPage,
      asc: asc,
      keyword: keyword,
      filterKey: filterKey
    }
    getUserList(data)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          console.log('handleChangePage')

          this.setState({
            page: page,
            count: response.data.total,
            rows: response.data.data
          })
        }
      })
  }

  onChange = (value) => {
    console.log(`selected ${value}`);
    let selectedValue = ''
    if(value !== 'すべて選択') {
      selectedValue = value
    }
    this.setState({filterKey: selectedValue})
    const {asc, keyword} = this.state

    let params = {
      asc: asc,
      keyword: keyword,
      filterKey: selectedValue
    }
    Object.assign(params)
    getUserList(params)
      .then(response => {
        if (!_.isEmpty(response.data)) {
          if (response.data.data) {
            this.setState({
              count: response.data.total,
              rows: response.data.data
            })
            if(value === 'すべて選択')
            return
            const {rows} = this.state
            if(rows) {
              const data = rows.filter((item =>
                item.companyName === value
                ))          
              if(data.length) {
                this.setState(
                  {count: data.length, rows: data}
                )
              }
              else {        
                this.setState(
                  {count: data.length, rows: ''}
                )
              }    
            }
          }
        }
      })
    
    
  }
  
  onSearch = (val) => {
    console.log('search:', val);
  }
  /**
   * Handle function for change rows per page
   */
  handleChangeRowsPerPage = (event) => {
    const {asc, keyword, filterKey} = this.state
    const data = {
      page: 0,
      limit: event.target.value,
      asc: asc,
      keyword: keyword,
      filterKey: filterKey
    }
    console.log('handleChangeRowsPerPage')
    getUserList(data)
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

  onClickEditButton = (id) => {
    if (!_.isEmpty(id) || id) {
      this.props.history.push({
        pathname: PageConstant.EDIT_USER + '/~' + id + '?num=' + this.state.page + '&limit=' + this.state.rowsPerPage
      })
    }
  }

  onClickDownloadCSV = () => {

    this.fetchCSVData()
  }

  changeStatusTimer = (btnActive) => {
    if(btnActive === true){
      return <FormattedMessage id="btn.sendAllUsers"/>
    }
    else {
      return <FormattedMessage id="btn.waitingRequest"/>
    }
  }

  onClickSendRequest = () => {
    addRequest()
        .then(response => {
          if (response.status === HTTP_SUCCESS) {
            openNotificationWithIcon('success', this.props.intl.formatMessage({id: 'message.success.Request'}))
            this.setState({btnActive: false})
            this.timer = setInterval(() => this.fetchUserList(), 50000)
          }
        })
  }

  render() {
    const {
      loader,
      rows,
      count,
      page,
      rowsPerPage,
      rowsPerPageOptions,
      btnActive
    } = this.state

    const today = new Date()
    return (
      <div>
        <div className="gx-flex-row gx-align-items-right">
          <Button className="ant-btn-primary gx-btn-rounded-green gx-ml-auto"
                  onClick={this.onClickDownloadCSV}>
            <FormattedMessage id="btn.downloadCSV"/>
          </Button>
          <CSVLink
            data={this.state.downloadRows}
            headers={this.getItemCSVWithName()}
            filename={"CHE_list_" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ".csv"}
            className="hidden"
            ref={this.csvLink}
            target="_blank"
          />
          <Button className="ant-btn-primary gx-btn-rounded-blue" style={{marginleft: '2px !important'}} disabled={!btnActive} onClick={this.onClickSendRequest}>
          {
            this.changeStatusTimer(btnActive)
          }
          </Button>
        </div>
        <div className="gx-flex-row gx-align-items-center gx-mb-4">
          <h2 className="title gx-mb-auto gx-page-title"><FormattedMessage id="page.title.users"/></h2>
        </div>
        <Card className="gx-card">
          <Spin spinning={loader} size="large">
            <div className="gx-flex-row gx-align-items-center gx-mb-4">
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-18 ant-col-xl-20 ant-col-xxl-20 gx-mb-2">
                <div
                  className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-24 ant-col-xl-12 ant-col-xxl-8 gx-no-padding">
                  <div className="gx-no-flex-wrap-flow">
                    <Input placeholder="ユーザー名、メールアドレス、入金アドレス。。。" className="gx-mr-2" onChange={this.onChangeKeyword}/>
                    <Button className="ant-btn-primary gx-mb-0 gx-btn-rounded-blue1" onClick={this.onClickSearchButton}>
                      <FormattedMessage id="btn.search"/>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div
                className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-12 ant-col-lg-8 ant-col-xl-4 ant-col-xxl-4 gx-mb-2">
                <FormList
                        name={"companyName"}
                        placeholder='倶楽部を選択'
                        onChange={this.onChange}
                        onSearch={this.onSearch}
                        intl={this.props.intl}
                        required={true}
                        readOnly={false}
                />
              </div>

            </div>
            <AuthVerify/>
            <UserList
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
              handleChangeAllowStatus={this.handleChangeAllowStatus}
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

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Users))
