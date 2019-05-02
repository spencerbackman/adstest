const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 5000;
const secret = process.env.secret || "SECRET";

app.use(express.static(path.join(__dirname, "client", "build")));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

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

const insightsFields = ['impressions', 'frequency', 'clicks', 'ctr'];

const req = account.read([AdAccount.Fields.name])
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
}).catch(err => {
    console.log(err);
})


app.use('/fbApi', (req, res) => {
    console.log(req.body)
    console.log(res.body)
}
);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// })

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});