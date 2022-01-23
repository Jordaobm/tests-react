import { fireEvent, render, screen } from "@testing-library/react";
import { Video } from "../../context/user";
import { Form } from "./Form";

let videos: Video[] = [];

function handleAddVideo(video: Video) {
  videos = [...videos, video];
}

function mockUseUser() {
  return {
    user: {
      googleId: "116242710850423568991",
      imageUrl:
        "https://lh3.googleusercontent.com/a/AATXAJwxyZDG9G6Vg4NwhfZdHPa4u0EhhBDoWaPEPOT9=s96-c",
      email: "rarius16@gmail.com",
      name: "Olimpo Rarius",
      givenName: "Olimpo",
      familyName: "Rarius",
    },
    handleAddVideo,
    videos,
  };
}

jest.mock("../../context/user", () => {
  return {
    useUser: mockUseUser,
  };
});

describe("Form", () => {
  it("should be able to render Form component", () => {
    render(<Form />);

    const input = screen.getAllByPlaceholderText(
      "Digite a url"
    )[0] as HTMLInputElement;

    expect(input?.id).toBe("url");
  });

  it("should be able to search Video by input search", () => {
    render(<Form />);

    const input = screen.getAllByPlaceholderText(
      "Digite a url"
    )[0] as HTMLInputElement;

    const button = screen.getByText("Buscar");

    fireEvent.change(input, {
      target: { value: "https://www.youtube.com/watch?v=pbwXsjVEMqg" },
    });

    fireEvent.click(button);

    expect(videos).toEqual(
      expect.arrayContaining([
        {
          googleId: "116242710850423568991",
          url: "https://www.youtube.com/watch?v=pbwXsjVEMqg",
        },
      ])
    );

    expect(input.value).toBe("");
  });
});
