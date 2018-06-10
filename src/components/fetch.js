import React from 'react'
import { Card } from 'antd';

// 引入标准Fetch及IE兼容依赖
import 'whatwg-fetch'




export default class myCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lists: []
        }
    }

    // 获取数据
    fetchFn = () => {
        fetch('./../public/data.json')
            .then((res) => { console.log(res.status);
                console.log(res.headers.get('content-type'));
                return res.json() })
            .then((data) => { this.setState({lists:data.listData}) })
            .catch((e) => { console.log(e.message) })
    }

    componentDidMount() {
        this.fetchFn()
    }

    render() {
        return (
            <Card title="世界杯新闻简讯" style={{ width: "800px", margin: "0 auto" }} className="animated zoomIn">
                {
                    this.state.lists.map((e) => {
                        return (
                            <p className="doclist"><a href={ e.url } target="_blank">{ e.title }</a></p>
                        )
                    })
                }
            </Card>
        )
    }
}
