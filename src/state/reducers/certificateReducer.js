const certificateReducer = (list = [], action) => {
  switch (action.type) {
    case "ADD_Certificate":
      return [...list, action.payload];
    case "EDIT_Certificate":
      let newArr = [...list];
      newArr[action.payload.id] = action.payload;
      return newArr;
    case "REMOVE_Certificate":
      let arr = [...list];
      arr.splice(action.payload, 1);
      return arr;
    default:
      return list;
  }
};
export default certificateReducer;
