document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const postId = params.get("id");
  const pageHeader = document.querySelector(".page-header");

  if (!postId || !pageHeader) return;

  const currentPost = posts.find(p => p.id === postId);

  if (currentPost) {
    pageHeader.textContent = currentPost.card.title;
    
    const heroImage = document.getElementById("hero-image");
    if (heroImage && currentPost.card.thumbnail) {
      heroImage.src = currentPost.card.thumbnail;
    } else {
      heroImage.style.display = "none";
      document.getElementById("main-content").style.marginTop = "80px";
    }

    const postContentContainer = document.querySelector(".blog-post-content");
    if (postContentContainer && currentPost.content) {
      postContentContainer.innerHTML = currentPost.content;
    }
  } else {
    pageHeader.textContent = "Post Not Found";
  }
}); 