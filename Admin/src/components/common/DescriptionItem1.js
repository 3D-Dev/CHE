import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { Button, Descriptions } from 'antd'
import { connect } from 'react-redux'

class DescriptionItem1 extends Component {
  onHandleClick = () => {
    this.props.onHandleClick()
  }

  render() {
    const {text, title, btnTitle, visiable} = this.props
    return (
      <div className="notice-green-div">
        <Descriptions
          title={<h3 className="notice-green-content">{title}</h3>}
          extra={visiable ? <Button type="primary" className="gx-btn-rounded-green"
                                    onClick={this.onHandleClick}>{btnTitle}</Button> : null}
        >
          <Descriptions.Item className="gx-pb-0">
            <div className="notice-green-content">{text}</div>
          </Descriptions.Item>
        </Descriptions>
      </div>
    )
  }
}

const mapDispatchToProps = {}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(injectIntl(DescriptionItem1)))
