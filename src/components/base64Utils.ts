export const createCustomCampaignId = (id: number, email: string) => {
    let b64 = Buffer.from(`${id};${email}`).toString('base64');
    let newB64 = "";
    for(let i = 0; i < b64.length; i++) {
        newB64 += String.fromCharCode(b64.charCodeAt(i) + 1);
    }

    return Buffer.from(newB64 + b64).toString('base64');
}

export const decodeCustomCampaignId = (campaignId: string) => {
    let decodedCampaignId = Buffer.from(campaignId as string, 'base64').toString('ascii');
    let newDecodedCampaignId = "";
    for(let i = 0; i < decodedCampaignId.length/2; i++) {
        newDecodedCampaignId += String.fromCharCode(decodedCampaignId.charCodeAt(i) - 1);
    }
    newDecodedCampaignId = Buffer.from(newDecodedCampaignId, 'base64').toString('ascii');
    let finalCampaignId = Buffer.from(newDecodedCampaignId).toString('ascii');
    let finalCampaignIdArray = finalCampaignId.split(';');
    return { id: finalCampaignIdArray[0], email: finalCampaignIdArray[1] };
}
