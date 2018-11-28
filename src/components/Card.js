import React from 'react'

export default class Card extends React.Component {
    render() {
        const {card, style} = this.props
        return (
            <div className="item" style={style}>
                {card}
            </div>
        )
    }
}