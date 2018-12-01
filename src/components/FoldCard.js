import React from 'react'

class FoldCard extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: props.status || true,
			distance: props.distance || 100,
			top: props.tops || 50,
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
  touchmove = (e) => {
    const touchMoveY = e.changedTouches[0].pageY - this.state.touchStartY
    const {status, distance} = this.state
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
	componentWillUnmount() {
    document.removeEventListener('touchstart', this.touchstart)
    document.removeEventListener('touchmove', this.touchmove)
    document.removeEventListener('touchend', this.touchend)
    console.info('componentWillUnmount')
	}
	render() {
		const {top} = this.props
		const {touchMoveY} = this.state
		return (
			<div className="fold-card">
				{this.props.children.map((child, index) => {
					const style={
						top: -index*(top - touchMoveY*0.5),
					}
					return (
						<div style={style}>
							{child}
						</div>
					)
				})}
			</div>
		)
	}
}

export default FoldCard