import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { User } from "../../context/user";
import { Header } from "./Header";

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

jest.mock("react-google-login", () => {
  const defaultMockSuccess = {
    tokenId: "tokenId",
  };

  const GoogleLogin = ({ onSuccess, buttonText }: any) => {
    const handleClick = () => {
      onSuccess(defaultMockSuccess);
    };

    return (
      <button
        data-testid="googleLogin"
        className="googleLogin"
        onClick={handleClick}
      >
        {buttonText}
      </button>
    );
  };

  return { GoogleLogin };
});

describe("Header", () => {
  it("should be able to render Header when not logged in", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const google = screen.getByTestId("googleLogin") as HTMLButtonElement;

    expect(google?.className).toBe("googleLogin");
  });

  it("should be able to render header and login user when click login button", () => {
    const { debug } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const google = screen.getByTestId("googleLogin") as HTMLButtonElement;

    fireEvent.click(google);
  });

  it("should be able to render header when logged in", () => {
    handleSignIn({
      googleId: "116242710850423568991",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwxyZDG9G6Vg4NwhfZdHPa4u0EhhBDoWaPEPOT9=s96-c",
      email: "rarius16@gmail.com",
      name: "Olimpo Rarius",
    });

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const button = screen.getByTestId("loggedButton") as HTMLButtonElement;

    expect(button?.className).toBe("loggedButton");
  });

  it("should be able to render header and log out user when click button", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const button = screen.getByTestId("loggedButton") as HTMLButtonElement;

    fireEvent.click(button);

    expect(user?.googleId).toBe(undefined);
  });
});
