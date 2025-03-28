import { ADD_POST, ADD_COMMENT } from "../actions/actionsTypes";

const initialState = {
  posts: [
    {
      id: "initial-post-1",
      nickname: "Vinicius Junior",
      email: "vinijr@gmail.com",
      image: "fence.jpg",
      comments: [
        { nickname: "Neymar Junior", comment: "É tois" },
        { nickname: "Mbappé", comment: "Brabo" },
      ],
    },
    {
      id: "initial-post-2",
      nickname: "Raphinha",
      email: "raphinhabr1@gmail.com",
      image: "bw.jpg",
      comments: [],
    },
  ],
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_POSTS":
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(action.payload.comment);
            } else {
              post.comments = [action.payload.comment];
            }
          }
          return post;
        }),
      };
    default:
      return state;
  }
}