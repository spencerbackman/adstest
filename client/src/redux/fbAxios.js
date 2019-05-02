import axios from 'axios';

export function getAds() {
    return dispatch => {
        axios.get(`https://graph.facebook.com/v3.2/act_1845433042241096/adsets?fields=id,name,status,insights{impressions,clicks,ctr}&access_token=EAAIO2Ea8s5kBAFukzaOiJHFYDCERSRQ9Vq6cJTeWVdfZBZChvLae8WUdLmwKNd4M3IVre78az0bdgLqEn8RGs8ak9ZCbJNPmTTWHSQfWJS2WC9eCqWdck7xdyfkZCP2jZA61Xfp9KXnMU2H2N8WamUD2pExxKkoZCKRqZBhLRZAWGgZDZD`)
        .then(response => {
            dispatch({
                type: 'GET_ADS',
                ads: response.data
            })
        }).catch(err => {
            console.log(err);
        })
    }
}

const initialAds = [];

export default function reducer (ads = initialAds, action) {
    switch(action.type) {
        case 'GET_ADS':
            return action.ads;
        default:
            return ads;
    }
}