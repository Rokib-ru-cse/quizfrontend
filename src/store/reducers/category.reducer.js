import { categoryConstants } from "../actions/actionConstants";

const initState = {
  categories: [],
  loading: false,
  error: null
};

const buildNewCategories =(parentId,categories,category)=>{

  let myCategory = []

  if(parentId==undefined){
    return [
      ...categories,
      {
        _id:category._id,
        name:category.name,
        slug:category.slug,
        children:[]
      }
    ]
  }

  for(let cat of categories){
    if(cat._id == parentId){
      myCategory.push({
        ...cat,
        children:cat.children ? buildNewCategories(parentId,[...cat.children,{
          _id: category._id,
          name:category.name,
          slug:category.slug,
          parentId:category.parentId,
          children:category.children
        }],category):[]
      }) 
    }else{
    myCategory.push({
      ...cat,
      children:cat.children ? buildNewCategories(parentId,cat.children,category) : []
    })
  } 
}

  return myCategory
}

const categoryReducers = (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case categoryConstants.GET_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      };

    case categoryConstants.GET_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case categoryConstants.ADD_CATEGORY_REQUEST:
      return{
        ...state,
        loading:true
      }
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      const category = action.payload.category
      return{
        ...state,
        categories : buildNewCategories(category.parentId,state.categories,category),
        loading:false
      }
    case categoryConstants.ADD_CATEGORY_FAILURE:
      return{
        ...initState,
        loading:false
      }

    default:
      return state;
  }
};

export default categoryReducers;
