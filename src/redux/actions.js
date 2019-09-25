export const FETCH = "REQUEST_CURRENCIES";
export const SUCCESS = "REQUEST_CURRENCIES_SUCCESS";
export const FAILURE = "REQUEST_CURRENCIES_FAILURE";

export function requestCurrencies() {
  return {
    type: FETCH
  };
}

export function requestCurrenciesSuccess(data) {
  return {
    type: SUCCESS,
    data
  };
}

export function requestCurrenciesError(error) {
  return {
    type: FAILURE,
    error
  };
}

export function fetchCurrencies(url = "http://api.nbp.pl/api/exchangerates/tables/a") {
  return function(dispatch) {
    dispatch(requestCurrencies());
    let f;
    try {
      f = fetch(url, {
        headers: {
          'Accept': 'application/json'
        },
      })
        .then(
          response =>
            response &&
            response.headers &&
            response.headers.get("Content-Type") && 
            response.headers.get("Content-Type").includes("application/json")
              ? response.json()
              : { error: "response is not a json" },
          error => dispatch(requestCurrenciesError(error))
        )
        .then(json =>
          json.error
            ? dispatch(requestCurrenciesError(json))
            : dispatch(requestCurrenciesSuccess(json))
        );
    } catch (error) {
      dispatch(requestCurrenciesError(error));
    }

    return f;
  };
}
