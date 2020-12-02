import { BASE_URL, BASE_PATH } from "../constants/urlConstants";
import axios from 'axios';

async function getLaunches() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        throw error;
    }

}


async function getLaunchesByParams(yearFilter, launchFilter, landingFilter) {
    try {
        const response = await axios.get(`${BASE_PATH}launch_year=${yearFilter}&launch_success=${launchFilter}&land_success=${landingFilter}`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

module.exports = { getLaunches, getLaunchesByParams };
