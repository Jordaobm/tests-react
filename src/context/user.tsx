import { createContext, ReactNode, useContext, useState } from "react";
import { LOCAL_STORAGE } from "../constants/constants";
import { getLocalStorage, setLocalStorage } from "../services/LocalStorage";

export interface User {
  email?: string;
  googleId: string;
  imageUrl?: string;
  name: string;
}

export interface Video {
  url: string;
  googleId: string;
}

interface UserContextData {
  user: User;
  handleSignIn: (user: User) => void;
  handleSignOut: () => void;
  videos: Video[];
  handleAddVideo: (video: Video) => void;
  handleRemoveVideo: (video: Video) => void;
}

const UserContext = createContext({} as UserContextData);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const getVideosByUser = (user: User) => {
    return getLocalStorage(LOCAL_STORAGE.videos, [])?.filter(
      (video: Video) => video?.googleId === user?.googleId
    );
  };

  const [user, setUser] = useState(getLocalStorage(LOCAL_STORAGE.user, {}));
  const [videos, setVideos] = useState(getVideosByUser(user));

  const handleSignIn = (user: User) => {
    setUser(setLocalStorage(LOCAL_STORAGE.user, user));
    setVideos(getVideosByUser(user));
  };

  const handleSignOut = () => {
    setUser(setLocalStorage(LOCAL_STORAGE.user, {}));
    setVideos([]);
  };

  const handleAddVideo = (video: Video) => {
    setLocalStorage(LOCAL_STORAGE.videos, [
      ...getLocalStorage(LOCAL_STORAGE.videos, []),
      video,
    ]);
    setVideos(getVideosByUser(user));
  };

  const handleRemoveVideo = (video: Video) => {
    const removedVideo: Video[] = getLocalStorage(
      LOCAL_STORAGE.videos,
      []
    )?.filter((v: Video) => JSON.stringify(v) !== JSON.stringify(video));

    setLocalStorage(LOCAL_STORAGE.videos, removedVideo);
    setVideos(getVideosByUser(user));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleSignIn,
        handleSignOut,
        handleAddVideo,
        videos,
        handleRemoveVideo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextData => {
  return useContext(UserContext);
};
