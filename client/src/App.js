import React from 'react';
import {connect} from 'react-redux';
import { getFbApi } from './redux/fbApi';
import './styles.css'
import Data from './Data';

class App extends React.Component{
    constructor() {
        super();
        this.state = {
            data: [],
            id: [],
            name: [],
            data2: []
        }
    }
    componentDidMount() {
        this.props.getFbApi()
    }

    sendData = () => {
        if(this.props.fbApi) {
            return this.props.fbApi.map(insights =>  (
                    <div>
                        <h2> {insights._data.adset_name} </h2>
                        <h2> {insights._data.ad_name} </h2>
                        <p> Impressions: {insights._data.impressions} </p>
                        <p> Clicks: {insights._data.clicks} </p>
                        <p> Click Through Rate: {insights._data.ctr} </p>
                        <p> DMA: {insights._data.dma} </p>
                    </div>
                )
            )
        }
    }

    render() {
        console.log(this.props.fbApi.map(insights => insights._data.impressions))
        return (
            <div>
                <h1> DMA </h1>
                <div> 
                    {this.sendData()} 
                </div>


                <h1> Gender & Age </h1>
                <div>
                    <Data />
                </div>

            </div>
        )

    }
}

export default connect(state => state, {getFbApi})(App);