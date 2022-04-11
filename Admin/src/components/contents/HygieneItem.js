import React from 'react'

class HygieneItem extends React.Component {
  render() {
    const {select} = this.props
    return (
      <div className="hygiene-item">
        <label className={select === 'ok' ? 'active-ok' : ''}>良</label>
        <label className={select === 'ng' ? 'active-no gx-ml-3' : 'gx-ml-3'}>否</label>
      </div>
    )
  }
}

export default HygieneItem