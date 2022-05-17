import React, { useState } from "react";
import { createNewPost, uploadImage } from "../utils/posts";
import { useDispatch, useSelector } from "react-redux";
import { addPosts } from "../features/postSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    const imageUrl = await uploadImage(imageFile);
    const newPost = await createNewPost(desc, imageUrl);
    newPost.userId = user;
    dispatch(addPosts(newPost));
    setDesc("");
  };
  return (
    <div className="p-4 px-9 shadow-xl rounded-xl mb-5 mt-3">
      <div className="mb-1 flex  items-center ">
        <div className="w-9 h-9 bg-primary-200 rounded-full flex justify-center items-center font-bold text-primary-900">
          {user.name && user.name[0].toUpperCase()}
        </div>

        <div className="leading-5 w-full pl-2">
          <input
            placeholder={`hey ${user.name} share your... !`}
            className="w-full focus:outline-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </div>

      <form
        className="text-grayLight flex justify-between mt-2 p-4 items-center"
        onSubmit={submitHandler}
      >
        <div>
          <label htmlFor="imageFile" className="cursor-pointer">
            <span className="material-icons-outlined mr-2">collections</span>
            <input
              type="file"
              id="imageFile"
              accept=".png,.jpeg,.jpg"
              className="hidden"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </label>
          <span className="material-icons-outlined ml-2">
            sentiment_satisfied_alt
          </span>
        </div>
        <button
          type="submit"
          className="text-white text-center w-100 bg-gradient-to-br from-primary-500 to-primary-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-primary-200 hover:shadow-md  dark:focus:ring-primary-800 font-medium rounded opacity-70  text-sm  px-5 py-2.5 text-center mr-2 mb-2 hover:opacity-90"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export { CreatePost };
