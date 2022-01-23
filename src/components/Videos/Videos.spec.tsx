import { fireEvent, render, screen } from "@testing-library/react";
import { Video } from "../../context/user";
import { Videos } from "./Videos";

let videos: Video[] = [
  {
    googleId: "110780761289278362453",
    url: "https://www.youtube.com/watch?v=FABWGQq-EGA",
  },
];

function handleRemoveVideo(video: Video) {
  videos = videos?.filter((v) => JSON.stringify(v) !== JSON.stringify(video));
}

function mockUseUser() {
  return {
    videos,
    handleRemoveVideo,
  };
}

jest.mock("../../context/user", () => {
  return {
    useUser: mockUseUser,
  };
});

describe("Videos", () => {
  it("should be able to render videos", () => {
    render(<Videos />);

    const grid = screen.getByTestId("grid") as HTMLDivElement;

    expect(grid?.className).toBe("grid");
  });

  it("should be able to render videos and remove one video", () => {
    render(<Videos />);

    const removeButton = screen.getByText("Excluir") as HTMLButtonElement;

    fireEvent.click(removeButton);

    expect(videos).toEqual([]);
  });
});
