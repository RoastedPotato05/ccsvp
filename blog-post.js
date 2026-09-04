const API_URL = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const slug = Array.from(params.keys())[0] || window.location.search.substring(1);
  const pageHeader = document.querySelector(".page-header");

  if (!slug || !pageHeader) return;

  const currentPost = posts.find(p => p.slug === slug);
  if (!currentPost) {
    pageHeader.textContent = "Post Not Found";
    return;
  }

  pageHeader.textContent = currentPost.card.title;

  // Replace the try/catch block in blog-post.js with this:
let views = currentPost.views || 0;
let likes = currentPost.likes || 0;

try {
  // Always increment on page load
  const viewRes = await fetch(`${API_URL}/api/posts/${slug}/view`, { method: 'POST' });
  if (viewRes.ok) {
    const data = await viewRes.json();
    views = data.views;
    likes = data.likes;
  }
} catch (err) {
  console.error("Error communicating with backend stats:", err);
}

  // Hero image setup...
  const heroImage = document.getElementById("hero-image");
  if (heroImage && currentPost.card.thumbnail) {
    heroImage.src = currentPost.card.thumbnail;
  } else if (heroImage) {
    heroImage.style.display = "none";
    document.getElementById("main-content").style.marginTop = "80px";
  }

  const postContentContainer = document.querySelector(".blog-post-content");
  if (postContentContainer && currentPost.content) {
    postContentContainer.innerHTML = currentPost.content;

    // Check local storage to see if THIS browser already liked the post
    let hasLiked = localStorage.getItem(`liked_${slug}`) === "true";
    
    const interactionDiv = document.createElement("div");
    interactionDiv.style.cssText = "margin-top: 40px; display: flex; align-items: center; gap: 20px; border-top: 1px solid #eee; padding-top: 20px;";
    interactionDiv.innerHTML = `
      <button id="like-btn" class="menu-btn" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background-color: ${hasLiked ? '#e6f0fa' : '#f5f5f5'}; border: 1px solid #ccc; cursor: pointer; font-family: 'Prompt', sans-serif;">
        <svg id="like-svg" width="18" height="18" viewBox="0 0 24 24" fill="${hasLiked ? '#4780b5' : 'none'}" stroke="#4780b5" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
        <span id="like-text">${hasLiked ? 'Liked' : 'Like Post'}</span> (<span id="like-count">${likes}</span>)
      </button>
      <span style="font-family: 'Prompt', sans-serif; color: #666; font-size: 16px;">Total Views: ${views}</span>
    `;
    
    postContentContainer.appendChild(interactionDiv);

    const likeBtn = document.getElementById("like-btn");
    const likeText = document.getElementById("like-text");
    const likeCount = document.getElementById("like-count");
    const likeSvg = document.getElementById("like-svg");

    likeBtn.addEventListener("click", async () => {
      hasLiked = localStorage.getItem(`liked_${slug}`) === "true";
      const endpoint = hasLiked ? 'unlike' : 'like';

      try {
        const res = await fetch(`${API_URL}/api/posts/${slug}/${endpoint}`, { method: 'POST' });
        if (res.ok) {
          const data = await res.json();
          likes = data.likes;
          likeCount.textContent = likes;

          if (hasLiked) {
            // Switch to unliked state
            localStorage.removeItem(`liked_${slug}`);
            likeText.textContent = "Like Post";
            likeSvg.setAttribute("fill", "none");
            likeBtn.style.backgroundColor = "#f5f5f5";
          } else {
            // Switch to liked state
            localStorage.setItem(`liked_${slug}`, "true");
            likeText.textContent = "Liked";
            likeSvg.setAttribute("fill", "#4780b5");
            likeBtn.style.backgroundColor = "#e6f0fa";
          }
        }
      } catch (err) {
        console.error("Failed to update like status:", err);
      }
    });
  }  
});