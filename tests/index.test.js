import { render, screen } from "@testing-library/react";
import App from "../pages/index";
import {getLaunches} from "../services/api";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

describe("App", () => {
  it("renders without crashing", () => {
    render(
      <App />);
    expect(
      screen.getByText("SpaceX Launch Programs")
    ).toBeInTheDocument();
  });
});

describe("Check Api is working", () => {
  it('Api is returning results', async () => {
    const response = await getLaunches();
    expect(response).toBeDefined();
  });
});