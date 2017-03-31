// @flow

export const HOME_PAGE_ROUTE = '/'
export const gameRoute = (gameId: ?string) => `/${gameId || ':gameId'}`
