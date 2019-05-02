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

const insightsFields = ['impressions', 'frequency', 'clicks', 'ctr', 'ad_name', 'adset_name'];

  export function getFbApi() {
      return dispatch => {
        account.read([AdAccount.Fields.name])
        .then((account) => {
            return account.getCampaigns([Campaign.Fields.name], {limit: 50});
        })
        .then((result) => {
            const campaignIds = result.map((campaign) => {
                return campaign.id;
            });
            const params = Object.assign({
                level: 'ad',
                breakdowns: ['dma'],
                filtering: [{'field': 'ad.impressions', 'operator': 'GREATER_THAN', 'value':0}],
                date_preset: 'this_quarter',
                limit: 100
            }, {});
            const campaignsAdsInsightsFields = insightsFields.concat('campaign_id');
            return account.getInsights(campaignsAdsInsightsFields, params);
        })
        .then((insights) => {
            console.log(insights);
            dispatch({
                type: "GET_FB_API",
                fbApi: insights
            })
        }).catch(err => console.log(err));
      }
  }


export default function reducer(fbApi = [], action) {
    switch(action.type) {
        case 'GET_FB_API':
            return action.fbApi;
        default: 
            return fbApi;
    }
}