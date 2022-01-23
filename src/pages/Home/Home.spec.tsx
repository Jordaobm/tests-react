import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { User } from "../../context/user";
import { Home } from "./Home";

let user = {} as User;

function handleSignIn(data: User) {
  user = data;
}

function handleSignOut() {
  user = {} as User;
}

function mockUseUser() {
  return {
    user: user,
    handleSignIn,
    handleSignOut,
  };
}

jest.mock("../../context/user", () => {
  return {
    useUser: mockUseUser,
  };
});

describe("Home", () => {
  it("should be able to render Home page", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const container = screen.getByTestId("container") as HTMLDivElement;

    expect(container?.className).toBe("container");
  });

  it("should be able to render Home page logged user", () => {
    handleSignIn({
      googleId: "116242710850423568991",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwxyZDG9G6Vg4NwhfZdHPa4u0EhhBDoWaPEPOT9=s96-c",
      email: "rarius16@gmail.com",
      name: "Olimpo Rarius",
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(
      "Digite a url"
    ) as HTMLInputElement;

    expect(input?.id).toBe("url");
  });
});
