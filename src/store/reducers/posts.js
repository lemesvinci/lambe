import { ADD_POST, ADD_COMMENT } from "../actions/actionsTypes";

const initialState = {
  posts: [
    {
      id: Math.random(),
      nickname: "Vinicius Junior",
      email: "vinijr@gmail.com",
      image: require("../../../assets/imgs/fence.jpg"),
      comments: [
        {
          nickname: "Neymar Junior",
          comment: "É tois",
        },
        {
          nickname: "Mbappé",
          comment: "Brabo",
        },
      ],
    },
    {
      id: Math.random(),
      nickname: "Raphinha",
      email: "raphinhabr1@gmail.com",
      image: require("../../../assets/imgs/bw.jpg"),
      comments: [],
    },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload,
        }),
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
};

export default reducer;
