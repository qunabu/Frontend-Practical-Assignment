import * as ACTIONS from "./actions";

describe("actions", () => {
  it("fetch", () => {
    expect(ACTIONS.fetchCurrencies()).toBeInstanceOf(Function); // thunk
  });

  it("request", () => {
    const expectedAction = {
      type: ACTIONS.FETCH,
    };
    expect(ACTIONS.requestCurrencies(expectedAction.data)).toEqual(
      expectedAction
    );
  });

  it("success", () => {
    const expectedAction = {
      type: ACTIONS.SUCCESS,
      data: ["a", "b", "c"]
    };
    expect(ACTIONS.requestCurrenciesSuccess(expectedAction.data)).toEqual(
      expectedAction
    );
  });

  it("fail", () => {
    const expectedAction = {
      type: ACTIONS.FAILURE,
      error: "something is not right"
    };
    expect(ACTIONS.requestCurrenciesError(expectedAction.error)).toEqual(
      expectedAction
    );
  });
});
