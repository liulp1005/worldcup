import React from 'react'

// 结尾组件
export default class myAnimate extends React.Component {
    constructor(props) {
        super(props)   
    }
    render() {
        return (
            <div className="ani-box">
                <img src="./src/assets/images/face.jpg" width="200" className="animated fadeInUp lastPic" />
                <span className="animated flipInX ege">我的二维码</span>
                <div style={{ margin: '35px 0' }} />
                <h3>NAS_ADDR :   n1cRWNDEnSaaUYvizkZgva4qbXafHro8GQT </h3>
            </div>
        )
    }       
}