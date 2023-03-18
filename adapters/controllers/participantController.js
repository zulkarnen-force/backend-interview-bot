// import  from '../../application/use_cases/participant/findAll.js';
// import countAll from '../../application/use_cases/post/countAll';
import store from '../../application/use_cases/participant/store.js';
// import findById from '../../application/use_cases/post/findById';
// import updateById from '../../application/use_cases/post/updateById';

import findAll from "../../application/use_cases/participant/findAll.js";

// import deletePost from '../../application/use_cases/post/deleteΒyId';
// findAll
export default function postController(
  postDbRepository,
  postDbRepositoryImpl,
) {

  const dbRepository = postDbRepository(postDbRepositoryImpl());
 


  // Fetch all the posts of the logged in user
  const fetchAllPosts = (req, res, next) => {
    findAll(dbRepository).then(r => res.json(r))
  
        // const params = {};
    // const response = {};

    // // Dynamically created query params based on endpoint params
    // for (const key in req.query) {
    //   if (Object.prototype.hasOwnProperty.call(req.query, key)) {
    //     params[key] = req.query[key];
    //   }
    // }
    // // predefined query params (apart from dynamically) for pagination
    // // and current logged in user
    // params.page = params.page ? parseInt(params.page, 10) : 1;
    // params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;
    // params.userId = req.user.id;

    // findAll(params, dbRepository)
    //   .then((posts) => {
    //     response.posts = posts;
    //     const cachingOptions = {
    //       key: 'posts_',
    //       expireTimeSec: 30,
    //       data: JSON.stringify(posts)
    //     };
    //     // cache the result to redis
    //     cachingRepository.setCache(cachingOptions);
    //     return countAll(params, dbRepository);
    //   })
    //   .then((totalItems) => {
    //     response.totalItems = totalItems;
    //     response.totalPages = Math.ceil(totalItems / params.perPage);
    //     response.itemsPerPage = params.perPage;
    //     return res.json(response);
    //   })
    //   .catch((error) => next(error));
  };

  const fetchPostById = (req, res, next) => {
    findById(req.params.id, dbRepository)
      .then((post) => {
        if (!post) {
          throw new Error(`No post found with id: ${req.params.id}`);
        }
        res.json(post);
      })
      .catch((error) => next(error));
  };

  const addNewPartisipant = (req, res, next) => {
    let response = {};
    const { hobby, name, id } = req.body;

    store(
      {hobby, name, id},
      dbRepository
    )
      .then((result) => {
        response.data = result;
        response.message = 'created new partisipant successfully'
        response.code = 200

        return res.json(
          response
        );
      })
      .catch((error) => next(error));
  };

  const deletePostById = (req, res, next) => {
    deletePost(req.params.id, dbRepository)
      .then(() => res.json('post sucessfully deleted!'))
      .catch((error) => next(error));
  };

  const updatePostById = (req, res, next) => {
    const { title, description, isPublished } = req.body;

    updateById({
      id: req.params.id,
      title,
      description,
      userId: req.user.id,
      isPublished,
      postRepository: dbRepository
    })
      .then((message) => res.json(message))
      .catch((error) => next(error));
  };

  return {
    fetchAllPosts,
    addNewPartisipant,
    fetchPostById,
    updatePostById,
    deletePostById
  };
}
