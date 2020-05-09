import { combineReducers } from 'redux';
import { reducer as allTheApplyFormReducer }  from "../allTheApplyForm/store";
import { reducer as detailReducer }  from "../detail/store";
import { reducer as summaryReducer}  from '../summary/store';
import {reducer as surplusReducer} 
from  '../surplus/store';

// import {reducer as ticketsOutReducer }  from "../tickestOut/store";
// import {reducer as backChangeTicketReducer} from "../backChangeTicket/store";
// import {reducer as changeWaitAffirmFormReducer} from "../changeWaitAffirmForm/store";
// import {reducer as waitAffirmTicketOutReducer} from "../waitAffirmForm/store";
// import {reducer as waitQuoteAgainReducer} from "../waitQuoteAgain/store"

import {reducer as closedFormReducer }  from "../ClosedForm/store";

export default combineReducers({
    allTheApplyFormReducer,
    closedFormReducer,
    detailReducer,
    summaryReducer,
    surplusReducer
    // ticketsOutReducer,
    // backChangeTicketReducer,
    // changeWaitAffirmFormReducer,
    // waitAffirmTicketOutReducer,
    // waitQuoteAgainReducer
})