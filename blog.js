document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".blog-container");
  const filterBtn = document.getElementById("blogFilterBtn");
  const filterDropdown = document.getElementById("blogFilterDropdown");
  const searchInput = document.getElementById("blogSearch");
  if (!container || !filterBtn || !filterDropdown) return;

  function getPostStats(postId, defaultViews, defaultLikes) {
    const stored = localStorage.getItem(`post_stats_${postId}`);
    if (stored) {
      try { return JSON.parse(stored); } catch (e) {}
    }
    const initial = { views: defaultViews || 0, likes: defaultLikes || 0 };
    localStorage.setItem(`post_stats_${postId}`, JSON.stringify(initial));
    return initial;
  }

  const visiblePosts = posts.filter(p => !p.hidden);
  
  // Sort visible posts by integer ID in descending order (newest first)
  visiblePosts.sort((a, b) => b.id - a.id);

  const topics = [...new Set(visiblePosts.map(p => p.card.topic))];
  topics.forEach(topic => {
    if (!topic) return;
    const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
    const label = document.createElement("label");
    label.className = "menu-btn blog-dropdown-item";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = topic;
    checkbox.className = "blog-topic-checkbox";
    label.appendChild(checkbox);
    label.append(` ${formattedTopic}`);
    filterDropdown.appendChild(label);
  });

  const wrapper = filterBtn.closest(".blog-filter-wrapper");
  const btnTextSpan = filterBtn.querySelector("span");

  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle("open");
    filterDropdown.style.display = isOpen ? "flex" : "none";
  });

  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
      filterDropdown.style.display = "none";
    }
  });

  function renderPosts(postsToRender) {
    container.innerHTML = "";
    
    if (postsToRender.length === 0) {
      container.innerHTML = `<p style="font-family: 'Prompt', sans-serif; padding: 15px;">No blog posts found.</p>`;
      return;
    }

    postsToRender.forEach(post => {
      const card = document.createElement("div");
      card.className = "blog-card";
      card.setAttribute("data-topic", post.card.topic);
      
      const stats = getPostStats(post.id, post.views, post.likes);

      // Navigate using the slug in the URL query string
      card.addEventListener("click", () => {
        stats.views += 1;
        localStorage.setItem(`post_stats_${post.id}`, JSON.stringify(stats));
        window.location.href = `blog-post.html?${post.slug}`;
      });

      const footerHTML = `
        <div class="blog-card-footer">
          <span style="display: flex; align-items: center; gap: 15px;">
            <span style="display: flex; align-items: center; gap: 5px;">
              <svg style="margin-top: -2px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${post.card.date}
            </span>
            <span style="display: flex; align-items: center; gap: 4px; color: #666;" title="Views">
              <svg style="margin-top: -2px;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ${stats.views}
            </span>
            <span style="display: flex; align-items: center; gap: 4px; color: #666;" title="Likes">
              <svg style="margin-top: -2px;" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
              ${stats.likes}
            </span>
          </span>
          <span class="blue-text">Read more <div class="read-more-arrow"></div></span>
        </div>
      `;

      if (post.card.thumbnail) {
        card.innerHTML = `
          <div class="blog-card-content">
            <div class="blog-card-text">
              <h2 class="blog-card-title">${post.card.title}</h2>
              <p class="blog-card-desc">${post.card.description}</p>
            </div>
            <img src="${post.card.thumbnail}" alt="${post.card.title}" class="blog-card-img">
          </div>
          ${footerHTML}
        `;
      } else {
        card.innerHTML = `
          <div class="blog-card-content">
            <div class="blog-card-text">
              <h2 class="blog-card-title">${post.card.title}</h2>
              <p class="blog-card-desc">${post.card.description}</p>
            </div>
          </div>
          ${footerHTML}
        `;
      }
      
      container.appendChild(card);
    });
  }

  renderPosts(visiblePosts);

  function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    const checkedCheckboxes = filterDropdown.querySelectorAll(".blog-topic-checkbox:checked");
    const selectedTopics = Array.from(checkedCheckboxes).map(cb => cb.value);

    if (selectedTopics.length === 0) {
      btnTextSpan.textContent = "Filter by topic";
    } else if (selectedTopics.length === 1) {
      btnTextSpan.textContent = selectedTopics[0].charAt(0).toUpperCase() + selectedTopics[0].slice(1);
    } else {
      btnTextSpan.textContent = `${selectedTopics.length} topics selected`;
    }

    const filtered = visiblePosts.filter(post => {
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(post.card.topic);
      const matchesSearch = post.card.title.toLowerCase().includes(searchTerm) || post.card.description.toLowerCase().includes(searchTerm);
      return matchesTopic && matchesSearch;
    });

    renderPosts(filtered);
  }

  searchInput.addEventListener("input", filterAndRender);
  filterDropdown.addEventListener("change", filterAndRender);
});