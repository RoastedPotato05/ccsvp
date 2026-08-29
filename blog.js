document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".blog-container");
  const filterBtn = document.getElementById("blogFilterBtn");
  const filterDropdown = document.getElementById("blogFilterDropdown");
  const searchInput = document.getElementById("blogSearch");
  if (!container || !filterBtn || !filterDropdown) return;

  // Filter out hidden posts from the listing/cards logic
  const visiblePosts = posts.filter(p => !p.hidden);

  // Sort visible posts by ID in descending order (highest ID/newest first)
  visiblePosts.sort((a, b) => parseInt(b.id) - parseInt(a.id));

  // Populate unique topic checkboxes dynamically from visible posts only
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

  // Toggle custom dropdown on button click
  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = wrapper.classList.toggle("open");
    filterDropdown.style.display = isOpen ? "flex" : "none";
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!wrapper.contains(e.target)) {
      wrapper.classList.remove("open");
      filterDropdown.style.display = "none";
    }
  });

  // Render function to draw cards
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
      
      // Navigate to the post page with the post ID
      card.addEventListener("click", () => {
        window.location.href = `blog-post.html?id=${post.id}`;
      });

      if (post.card.thumbnail) {
        card.innerHTML = `
          <div class="blog-card-content">
            <div class="blog-card-text">
              <h2 class="blog-card-title">${post.card.title}</h2>
              <p class="blog-card-desc">${post.card.description}</p>
            </div>
            <img src="${post.card.thumbnail}" alt="${post.card.title}" class="blog-card-img">
          </div>
          <div class="blog-card-footer">
            <span style="display: flex; align-items: bottom; gap: 10px;">
              <svg style="margin-top: 1px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            ${post.card.date}</span>
            <span class="blue-text">Read more <div class="read-more-arrow"></div></span>
          </div>
        `;
      } else {
        card.innerHTML = `
          <div class="blog-card-content">
            <div class="blog-card-text">
              <h2 class="blog-card-title">${post.card.title}</h2>
              <p class="blog-card-desc">${post.card.description}</p>
            </div>
          </div>
          <div class="blog-card-footer">
            <span style="display: flex; align-items: bottom; gap: 10px;">
              <svg style="margin-top: 1px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            ${post.card.date}</span>
            <span class="blue-text">Read more <div class="read-more-arrow"></div></span>
          </div>
        `;
      }

      
      container.appendChild(card);
    });
  }

  // Initial render using visible posts
  renderPosts(visiblePosts);

  // Search and Multiple Checkbox Filtering Logic
  function filterAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Gather all checked topics
    const checkedCheckboxes = filterDropdown.querySelectorAll(".blog-topic-checkbox:checked");
    const selectedTopics = Array.from(checkedCheckboxes).map(cb => cb.value);

    // Update button text to reflect current selection count
    if (selectedTopics.length === 0) {
      btnTextSpan.textContent = "Filter by topic";
    } else if (selectedTopics.length === 1) {
      btnTextSpan.textContent = selectedTopics[0].charAt(0).toUpperCase() + selectedTopics[0].slice(1);
    } else {
      btnTextSpan.textContent = `${selectedTopics.length} topics selected`;
    }

    const filtered = visiblePosts.filter(post => {
      const matchesTopic = selectedTopics.length === 0 || selectedTopics.includes(post.card.topic);
      const matchesSearch = 
        post.card.title.toLowerCase().includes(searchTerm) || 
        post.card.description.toLowerCase().includes(searchTerm);
      
      return matchesTopic && matchesSearch;
    });

    renderPosts(filtered);
  }

  searchInput.addEventListener("input", filterAndRender);
  filterDropdown.addEventListener("change", filterAndRender);
});