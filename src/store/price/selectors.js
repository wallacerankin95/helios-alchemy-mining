// Other code such as selectors can use the imported `RootState` type
export const userInfo = (state) => state.wosClient.userInfo;
export const isAuthenticated = (state) => state.wosClient.isAuthenticated;
export const allTransactionData = (state) => state.wosClient.allTransactionData;
export const myTransactionData = (state) => state.wosClient.myTransactionData;
export const myDealData = (state) => state.wosClient.myDealData;
export const myCollectionData = (state) => state.wosClient.myCollectionData;
export const buyingInformationData = (state) =>
  state.wosClient.buyingInformationData;
export const consignmentInformationData = (state) =>
  state.wosClient.consignmentInformationData;
export const helpData = (state) => state.wosClient.helpData;
export const keyword = (state) => state.wosClient.keyword;
