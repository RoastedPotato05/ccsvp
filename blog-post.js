document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const slug = Array.from(params.keys())[0] || window.location.search.substring(1);
  const pageHeader = document.querySelector(".page-header");

  if (!slug || !pageHeader) return;

  const currentPost = posts.find(p => p.slug === slug);

  if (currentPost) {
    pageHeader.textContent = currentPost.card.title;
    
    let stats = localStorage.getItem(`post_stats_${currentPost.id}`);
    if (stats) {
      stats = JSON.parse(stats);
    } else {
      stats = { views: currentPost.views || 0, likes: currentPost.likes || 0 };
    }
    
    if (!sessionStorage.getItem(`viewed_${currentPost.id}`)) {
      stats.views += 1;
      sessionStorage.setItem(`viewed_${currentPost.id}`, "true");
      localStorage.setItem(`post_stats_${currentPost.id}`, JSON.stringify(stats));
    }

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

      const hasLiked = localStorage.getItem(`liked_${currentPost.id}`) === "true";
      
      const interactionDiv = document.createElement("div");
      interactionDiv.style.cssText = "margin-top: 40px; display: flex; align-items: center; gap: 20px; border-top: 1px solid #eee; padding-top: 20px;";
      interactionDiv.innerHTML = `
        <button id="like-btn" class="menu-btn" style="display: flex; align-items: center; gap: 8px; padding: 10px 16px; background-color: ${hasLiked ? '#e6f0fa' : '#f5f5f5'}; border: 1px solid #ccc; cursor: ${hasLiked ? 'default' : 'pointer'}; font-family: 'Prompt', sans-serif;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${hasLiked ? '#4780b5' : 'none'}" stroke="#4780b5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
          <span id="like-text">${hasLiked ? 'Liked' : 'Like Post'}</span> (<span id="like-count">${stats.likes}</span>)
        </button>
        <span style="font-family: 'Prompt', sans-serif; color: #666; font-size: 16px;">Total Views: ${stats.views}</span>
      `;
      
      postContentContainer.appendChild(interactionDiv);

      const likeBtn = document.getElementById("like-btn");
      if (!hasLiked) {
        likeBtn.addEventListener("click", () => {
          stats.likes += 1;
          localStorage.setItem(`post_stats_${currentPost.id}`, JSON.stringify(stats));
          localStorage.setItem(`liked_${currentPost.id}`, "true");
          
          document.getElementById("like-count").textContent = stats.likes;
          document.getElementById("like-text").textContent = "Liked";
          likeBtn.style.backgroundColor = "#e6f0fa";
          likeBtn.style.cursor = "default";
          likeBtn.replaceWith(likeBtn.cloneNode(true));
        });
      }
    }
  } else {
    pageHeader.textContent = "Post Not Found";
    document.getElementById("hero-image").style.display = "none";
    document.getElementById("main-content").style.marginTop = "80px";
  }
});