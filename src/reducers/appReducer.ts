import Constants from '../actions/Constants';

type AppState = {
  weatherData?: string,
  error?: string,
  recentSearches: any[],
};

let initialState = {
  weatherData: undefined,
  error: undefined,
  recentSearches: [],
} as AppState;

if (window.localStorage.getItem('recentSearches')) {
  initialState = {
    ...initialState,
    ...JSON.parse(window.localStorage.getItem('recentSearches') as any),
  };
}

function appReducer(state = initialState, action: any) {
  if (action.type === Constants.RECEIVE_WEATHER_DATA) {
    if (action.data.cod !== '200') {
      return {
        ...state,
        weatherData: undefined,
        error: 'Invalid location/query. Try again?',
      };
    }

    const searches = [{
      city: action.data.city.name,
      timestamp: new Date().getTime(),
    }, ...state.recentSearches];

    window.localStorage.setItem('recentSearches', JSON.stringify({
      recentSearches: searches,
    }));

    return {
      ...state,
      weatherData: action.data,
      error: undefined,
      recentSearches: searches,
    };
  }

  return state;
}

export default appReducer;
