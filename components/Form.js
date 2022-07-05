import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { handlePostState } from "../atoms/postAtom";

function Form() {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { data: session } = useSession();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const uploadPost = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input,
        photoUrl,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
    });
    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none
        dark:placeholder-white/75"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate
        max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />

      <button
        className="absolute bottom-0 right-0 font-medium text-white 
        bg-blue-400 hover:bg-blue-500 rounded-full px-3.5 py-1
        disabled:bg-white/75 disabled:text-black/40 disabled:cursor-not-allowed"
        type="submit"
        onClick={uploadPost}
        disabled={!input.trim() && !photoUrl}
      >
        Post
      </button>
    </form>
  );
}

export default Form;
