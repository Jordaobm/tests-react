import { render, screen, fireEvent } from "@testing-library/react";
import { RenderDataComponent } from "./RenderDataComponent";
import { UserContextProvider } from "./user";

describe("User", () => {
  it("should be able to useUser", () => {
    render(
      <UserContextProvider>
        <RenderDataComponent />
      </UserContextProvider>
    );

    const userName = screen.getByTestId("userName") as HTMLTitleElement;

    expect(userName.className).toBe("userName");
  });

  it("should be able to useUser and SignIn", () => {
    render(
      <UserContextProvider>
        <RenderDataComponent />
      </UserContextProvider>
    );

    const signIn = screen.getByTestId("signIn") as HTMLButtonElement;

    fireEvent.click(signIn);

    const userName = screen.getByText("Olimpo Rarius") as HTMLTitleElement;

    expect(userName.className).toBe("userName");
  });

  it("should be able to useUser and SignIn and SignOut", () => {
    render(
      <UserContextProvider>
        <RenderDataComponent />
      </UserContextProvider>
    );

    const signIn = screen.getByTestId("signIn") as HTMLButtonElement;

    fireEvent.click(signIn);

    const signOut = screen.getByTestId("signOut") as HTMLButtonElement;

    fireEvent.click(signOut);

    const userName = screen.getByTestId("userName") as HTMLTitleElement;

    expect(userName.className).toBe("userName");
  });

  it("should be able to useUser and SignIn and addVideo", () => {
    render(
      <UserContextProvider>
        <RenderDataComponent />
      </UserContextProvider>
    );

    const signIn = screen.getByTestId("signIn") as HTMLButtonElement;

    fireEvent.click(signIn);

    const addVideo = screen.getByTestId("addVideo") as HTMLButtonElement;

    fireEvent.click(addVideo);

    expect(addVideo.className).toBe("addVideo");
  });

  it("should be able to useUser and SignIn and addVideo and removeVideo", () => {
    render(
      <UserContextProvider>
        <RenderDataComponent />
      </UserContextProvider>
    );

    const signIn = screen.getByTestId("signIn") as HTMLButtonElement;

    fireEvent.click(signIn);

    const addVideo = screen.getByTestId("addVideo") as HTMLButtonElement;

    fireEvent.click(addVideo);

    const removeVideo = screen.getByTestId("removeVideo") as HTMLButtonElement;

    fireEvent.click(removeVideo);

    expect(removeVideo.className).toBe("removeVideo");
  });
});
