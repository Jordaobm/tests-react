import { useUser } from "./user";

export const RenderDataComponent = () => {
  const {
    user,
    handleSignIn,
    handleSignOut,
    handleAddVideo,
    handleRemoveVideo,
  } = useUser();

  return (
    <div>
      <h1 className="userName" data-testid="userName">
        {user?.name}
      </h1>

      <button
        className="signIn"
        data-testid="signIn"
        onClick={() => {
          handleSignIn({
            googleId: "116242710850423568991",
            imageUrl:
              "https://lh3.googleusercontent.com/a/AATXAJwxyZDG9G6Vg4NwhfZdHPa4u0EhhBDoWaPEPOT9=s96-c",
            email: "rarius16@gmail.com",
            name: "Olimpo Rarius",
          });
        }}
      >
        Entrar
      </button>

      <button
        data-testid="signOut"
        onClick={() => {
          handleSignOut();
        }}
      >
        SignOut
      </button>

      <button
        className="addVideo"
        data-testid="addVideo"
        onClick={() => {
          handleAddVideo({
            googleId: "123",
            url: "url",
          });
        }}
      >
        Adicionar Vídeo
      </button>

      <button
        data-testid="removeVideo"
        className="removeVideo"
        onClick={() => {
          handleRemoveVideo({
            googleId: "123",
            url: "url",
          });
        }}
      >
        Adicionar Vídeo
      </button>
    </div>
  );
};
