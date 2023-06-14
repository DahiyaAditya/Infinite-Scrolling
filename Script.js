const Container = document.querySelector('.container');
// console.log(Container);
// console.log(Container);
let limit = 3;
let pageCount = 1;
let postCount = 1;
let alreadyDisplayed = [];
const getPost = async (limit, pageCount)=>{
    let data;
    
    await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}$_pages=${pageCount}`)
      .then(response => response.json())
      .then(json => data = json)

      let newPost = data.filter((post)=>{
          return !alreadyDisplayed.includes(post.id);
       }) 
    //    console.log(alreadyDisplayed);
      newPost.map((obj , i) => {
       const htmlData = `<div class="post">

        <p class="post-id">${obj.id}</p>

        <h2 class="title">${obj.title}</h2>

        <p>${obj.body}</p>

   </div>`;
   Container.insertAdjacentHTML('beforeend',htmlData);
   alreadyDisplayed.push(obj.id);
      });
}
getPost(limit, pageCount);

window.addEventListener('scroll',()=>{
    const  {scrollHeight, clientHeight, scrollTop} = document.documentElement;
   if(scrollTop + 1  + clientHeight >= scrollHeight){
    limit= limit +3
    pageCount++;
    getPost(limit, pageCount)
   }
})