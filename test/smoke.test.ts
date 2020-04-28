import { actionContext } from "../src";

describe("Smoke test", () => {
  it("is a function", () => {
    expect(actionContext).toBeInstanceOf(Function);
  });

  it("actionContext.VERSION is set", () => {
    expect(actionContext.VERSION).toEqual("0.0.0-development");
  });
});
