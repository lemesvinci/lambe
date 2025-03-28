import { ADD_POST } from "./actionsTypes";
import axios from "axios";

const uploadApi = axios.create({
  baseURL: "https://uploadimage-d2zbf4rrsq-uc.a.run.app",
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

const firebaseApi = axios.create({
  baseURL: "https://lambe-e5f0c-default-rtdb.firebaseio.com",
  timeout: 30000,
});

export const fetchPosts = () => {
  return async (dispatch) => {
    try {
      const response = await firebaseApi.get("/posts.json");

      const posts = [];
      for (const key in response.data) {
        posts.push({
          ...response.data[key],
          id: key,
        });
      }

      dispatch({
        type: "FETCH_POSTS",
        payload: posts,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addPost = (post) => {
  return async (dispatch) => {
    try {
      if (!post?.image?.base64) {
        throw new Error("Imagem em formato base64 é obrigatória");
      }

      const base64WithPrefix = post.image.base64.startsWith("data:image")
        ? post.image.base64
        : `data:image/jpeg;base64,${post.image.base64}`;

      const uploadResponse = await uploadApi.post("", {
        image: base64WithPrefix,
      });

      const imageUrl = uploadResponse.data?.imageUrl;
      if (!imageUrl) {
        throw new Error("Falha ao obter URL da imagem");
      }

      const postToSave = {
        ...post,
        image: imageUrl,
        createdAt: new Date().toISOString(),
      };

      const saveResponse = await firebaseApi.post("/posts.json", postToSave);

      if (!saveResponse.data?.name) {
        throw new Error("Falha ao salvar post no Firebase");
      }

      const savedPost = {
        ...postToSave,
        id: saveResponse.data.name,
      };

      dispatch({
        type: ADD_POST,
        payload: savedPost,
      });

      return { success: true, data: saveResponse.data };
    } catch (error) {
      throw error;
    }
  };
};