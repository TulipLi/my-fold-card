import React from 'react'

class FoldCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: props.status || false,
			distance: props.distance || 50,
			top: props.top || 50,
			touchStartY: 0,
			touchMoveY: 0,
			touchEndY: 0,
		}
	}
	componentDidMount() {
		console.info('componentDidMount')
		document.addEventListener('touchstart', this.touchstart)
		document.addEventListener('touchmove', this.touchmove)
		document.addEventListener('touchend', this.touchend)

	}

	touchstart = (e) => {
    console.info('start', e.targetTouches[0].pageY)
    this.setState({
      touchStartY: e.targetTouches[0].pageY
    })
  }
  touchmove = (e) => {
    const touchMoveY = e.changedTouches[0].pageY - this.state.touchStartY
    const {status, distance} = this.state
    console.info('move', {status, touchMoveY})
    if ((status && touchMoveY > 0) || (!status && touchMoveY < 0)) {
      return
    }
    if (touchMoveY <= distance && touchMoveY >= -distance) {
      this.setState({
        touchMoveY: touchMoveY.toFixed(),
      })
    } else if(touchMoveY > distance) {
      this.setState({
        touchMoveY: distance
      })
    } else if (touchMoveY < -distance) {
      this.setState({
        touchMoveY: -distance
      })
    }
	}
	touchend = (e) => {
    const touchMoveY = e.changedTouches[0].pageY - this.state.touchStartY
    const {status, distance} = this.state
    console.info('end', {status, touchMoveY})
    if (touchMoveY > 0 && touchMoveY < distance) { // 恢复
      console.info('huifu', touchMoveY)
      this.setState({
        touchMoveY: status ? 100 : 0,
      })
    } else if (touchMoveY >= distance) { // 展开
      console.info('zhankai', touchMoveY)
      this.setState({
        touchMoveY: 100,
        status: true
      })
    } else if (touchMoveY > -distance && touchMoveY < 0) { // 恢复
      console.info('huifu', touchMoveY)
      this.setState({
        touchMoveY: status ? 100 : 0,
        
      })
    } else if (touchMoveY <= -distance) { // 收起
      console.info('shouqi', touchMoveY)
      this.setState({
        touchMoveY: 0,
        status: false,
      })
    }
  }
	componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchstart)
    document.removeEventListener('touchmove', this.touchmove)
    document.removeEventListener('touchend', this.touchend)
    console.info('componentWillUnmount')
	}
	render() {
		const {touchMoveY, top, status} = this.state
		return (
			<div className="fold-card">
				{this.props.children.map((child, index) => {
					const style={
						top: -index*(top - touchMoveY*0.5),
						position: 'relative'
					}
					// // console.info(child)
					return (
						<div className="fold-item" style={style} key={index}>
							{child}
						</div>
					)
				})}
			</div>
		)
	}
}

export default FoldCard