import React from 'react'
import { connect } from 'react-redux'
import { Popover } from 'antd'
import { LANGUAGES } from '../../constants/AppConfigs'
import { switchLanguage } from '../../appRedux/actions/User'

class LanguageMenu extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      popoverVisible: false
    }
    this.onMenuChange = this.onMenuChange.bind(this)
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
  }

  languageMenu = () => (
    <ul className="gx-sub-popover">
      {LANGUAGES.map(language =>
        <li className="gx-media gx-pointer gx-p-2" key={language.code}
            onClick={(e) => this.onMenuChange(language.code)}>
          <i className={`flag flag-24 gx-mx-2 flag-${language.code}`}/>
          <span className="gx-language-text">{language.name}</span>
        </li>
      )}
    </ul>
  )

  onMenuChange(value) {
    this.setState({popoverVisible: false})
    this.props.switchLanguage(value)
  }

  handleVisibleChange(visible) {
    this.setState({popoverVisible: visible})
  }

  render() {
    const {locale} = this.props
    const {popoverVisible} = this.state

    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={this.languageMenu()}
        visible={popoverVisible}
        onVisibleChange={this.handleVisibleChange}
        trigger="hover">
        <span className="gx-pointer gx-flex-row gx-align-items-center">
          <i className={`flag flag-24 flag-${locale}`}/>
          <i className="icon icon-chevron-down gx-pl-2"/>
        </span>
      </Popover>
    )
  }
}

const mapStateToProps = ({user}) => {
  const {locale} = user
  return {locale}
}

export default connect(mapStateToProps, {switchLanguage})(LanguageMenu)
