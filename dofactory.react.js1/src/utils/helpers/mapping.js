

export const types = Object.freeze({  // A simulated entity type enum
    OPPORTUNITY: 0,
    LEAD: 1,
    ACCOUNT: 2,
    CONTACT: 3,
    TASK: 4,
    CASE: 5,
    CAMPAIGN: 6,
    PERSON: 7
});

//export const ToJson = (type, object) => { 
//    switch (type) {
//        case types.OPPORTUNITY:
            
//            const json = JSON.stringify(object);
//            break;
//        case types.LEAD:
//            break;
//        case types.ACCOUNT:
//            break;
//        default:
//            break;
//    }
//}



//export const FromJson = (type, json) => { 
//    switch (type) {
//        case "Opportunity":
            
//            const object = JSON.parse(json);
//            break;
//        case "Lead":
//            break;
//        default:
//            break;
//    }
//}

export const defaultObject = (type) => {
    const userId = '1'; // currentUser;
    //const ownerAlias = 'danderson';
    //const closeDate = 
    switch (type) {
        case types.OPPORTUNITY:
            return {
                id: 0,
                name: '', // required
                accountId: 0, // required
                //accountName: '',
                contactId: 0,
                //contactName: '',
                type: '',
                leadSource: '',
                amount: 0,
                expectedRevenue: 0,
                quantity: '',
                nextStep: '',
                probability: 0, 
                stage: '',
                closeDate: '',
                isPrivate: false,
                //isClosed: false,
                description: '',
                //campaignId: 0,
                ownerId: 0, 
                ownerAlias: '',
                //createdDate: ''
            };
            break;
        case types.LEAD:
            break;
        default:
            break;
    }
}


export default types;
//export default serialize;
//export default deserialize;