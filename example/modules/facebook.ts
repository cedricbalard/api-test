import SocialNetworks from '../../src/modules/socialnetworks/socialnetworks';

var provider = 'facebook';

// Config module for provider
let configs = [
  {
    name : provider,
    config : {
      id    : process.env.ID_PROVIDER,
      token : process.env.TOKEN_PROVIDER
    }
  }
];

// Post data
let dataToCreate = {
  message : 'New post'
};

// Create post
let createPost = async function () {

  try {
    // Load module
    let socialModule = new SocialNetworks(configs);

    // Create post
    let res = await socialModule.create(provider, dataToCreate);

    // Log success response
    console.log('\n --> createPost.success - res = ', res)
  } catch (error) {
    // Log failed response
    console.log('\n --> createPost.error : ', error)
  }
}

// Create post
createPost();
