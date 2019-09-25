import reducer, { INITIAL_STATE } from "./reducer";
import * as ACTIONS from "./actions";

describe("todos reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it("should return the loading state", () => {
    expect(reducer(undefined, { type: ACTIONS.FETCH })).toEqual({
      ...INITIAL_STATE,
      loading: true
    });
  });

  it("should return the error state", () => {
    expect(
      reducer(undefined, { type: ACTIONS.FAILURE, error: "not good" })
    ).toEqual({
      ...INITIAL_STATE,
      error: "not good"
    });
  });

  it("should return the success state", () => {
    
    const inputData = [{"table":"A","no":"186/A/NBP/2019","effectiveDate":"2019-09-25","rates":[{"currency":"bat (Tajlandia)","code":"THB","mid":0.1304}] }];

    const outputData = [
      {"currency":"bat (Tajlandia)","code":"THB","mid":0.1304}
    ];

    expect(
      reducer(undefined, { type: ACTIONS.SUCCESS, data: inputData })
    ).toEqual({
      ...INITIAL_STATE,
      currencies: outputData
    });
  });
});
