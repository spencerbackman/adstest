const express = require('express');
const route = express.Router();
const bizSdk = require('facebook-nodejs-business-sdk');
const Ad = bizSdk.Ad;
const AdAccount = bizSdk.AdAccount;
const Business = bizSdk.Business;
const Campaign = bizSdk.Campaign;
const accountId = 'act_2430591390316845';
const accessToken = 'EAAIO2Ea8s5kBACqs1U1ndkthckNQ76JNnKksvS5fZBzHjKxigaCcAflnHD4xsGd1vpH2D5TY8fZAZANpIphXsDfmLnZAGbg8EE5hQ2vZCZAULU6rVTag3fJvMJbLWZAOl66B5fuQPoOdHZAdYDZCocCAOhfvzJCOnhW7Ahi0nm3Ki5QZDZD';
const bussinessId = '686769051709194'; //ADD business ID here.
const campaignId = '23843230381800145'; //ADD Campaign ID Here
const api = bizSdk.FacebookAdsApi.init(accessToken);
const account = new AdAccount(accountId);

// breakdowns: ['age', 'gender']
// breakdowns: ['dma']

const insightsFields = ['impressions', 'frequency', 'clicks', 'ctr'];

const fbApi = account.read([AdAccount.Fields.name])
.then((account) => {
    return account.getCampaigns([Campaign.Fields.name], {limit: 10});
})
.then((result) => {
    const campaignIds = result.map((campaign) => {
        return campaign.id;
    });
    const params = Object.assign({
        level: 'ad',
        breakdowns: ['dma']
    }, {});
    const campaignsAdsInsightsFields = insightsFields.concat('campaign_id');
    return account.getInsights(campaignsAdsInsightsFields, params);
})
.then((insights) => {
    return insights
}).catch(err => console.log(err));

route.get(fbApi, (req, res) => {
    const data = new Data(req.body);
    console.log(req.body)
    data.save((err, data) => {
        if(err) return res.status(500).send(err);
        return res.status(201).send(data)
    })
})

module.exports = route;