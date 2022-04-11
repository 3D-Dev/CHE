import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

class TitleArea extends Component {
  render() {
    const {titleText} = this.props
    return (
      <div className="gx-title-area">
        <h4 className="title gx-no-margin gx-pl-4">{titleText}</h4>
      </div>
    )
  }
}

const mapDispatchToProps = {}

const mapStateToProps = ({custom}) => {
  const {titleText} = custom
  return {titleText}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(injectIntl(TitleArea)))
