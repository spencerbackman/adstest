import React from 'react'
import { connect } from 'react-redux'
import {getFbApiGenderAge} from './redux/fbApiGenderAge';

class Data extends React.Component {
    
    componentDidMount() {
        this.props.getFbApiGenderAge();
    }

    sendData = () => {
        if(this.props.fbApiGenderAge) {
            return this.props.fbApiGenderAge.map(insights => (
                                    <div>
                        <h2> {insights._data.adset_name} </h2>
                        <h2> {insights._data.ad_name} </h2>
                        <p> Gender: {insights._data.gender} </p>
                        <p> Age: {insights._data.age} </p>
                        <p> Impressions: {insights._data.impressions} </p>
                        <p> Clicks: {insights._data.clicks} </p>
                        <p> Click Through Rate: {insights._data.ctr} </p>
                    </div>
            ))
        }
    }
    render() {
        console.log(this.props.fbApiGenderAge.map(insights => insights._data))
        return(
            <div>
                <div>{this.sendData()}</div>
            </div>
        )
    }
}

export default connect(state => state, {getFbApiGenderAge})(Data);