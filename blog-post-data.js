const posts = [
  {
    id: 0,
    slug: "blog-template",
    hidden: false,
    views: 0,
    likes: 0,
    card: {
      title: "Blog Template",
      description: "A template for creating blog posts, this text is a description that only appears in this card.",
      topic: "Welcome",
      date: "2026-08-28",
      thumbnail: "images/blog-0.jpg"
    }, 
    content: `
      <div style="display: inline-flex; width: fit-content; align-items: center;">
          <span class="page-subheader">Placeholder subheader</span>
      </div>

      <p class="prompt-regular" style="font-size: 18px; line-height: 1.6; color: #555;">
          This is an introductory paragraph demonstrating standard body text. You can easily include 
            <a href='https://example.com' class='blue-text' style='text-decoration: underline;'>in-text links</a> 
          directly within your paragraphs.
          <br><br>
          You can split paragraphs by just using those 'br' tags above, or:
      </p>

      <p class="prompt-regular" style="font-size: 18px; line-height: 1.6; color: #555;">
          you can also put them in separate 'p' tags it doesnt really matter
      </p>

      <!-- 100% Proportional Image with Caption -->
      <div style="margin: 25px 0; width: 100%;">
        <img src="images/blog-0.jpg" alt="Sample Image Description" style="border-radius: 2px;">
        <span class="prompt-regular" style="font-size: 14px; color: #666; display: block; margin-top: 8px; text-align: center;">
          Figure 1: Example caption for an image
        </span>
      </div>

      <div style="display: inline-flex; width: fit-content; align-items: center;">
          <span class="page-subheader">Video Embed</span>
      </div>

      <!-- 100% Proportional Video Embed -->
      <div style="margin: 25px 0; width: 100%;">
        <iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      
      </div>
    `
  }, 
  {
    id: 1,
    slug: "another-blog-post",
    hidden: false,
    views: 0,
    likes: 0,
    card: {
      title: "Another Blog Post With A Longer Title (But No Image)",
      description: "Another template for creating blog posts, this description is different than the first one.",
      topic: "Welcome2",
      date: "2026-08-28"
    }, 
    content: `
      <div style="display: inline-flex; width: fit-content; align-items: center;">
          <span class="page-subheader">Placeholder subheader</span>
      </div>

      <p class="prompt-regular" style="font-size: 18px; line-height: 1.6; color: #555;">
          This is an introductory paragraph demonstrating standard body text. You can easily include 
            <a href='https://example.com' class='blue-text' style='text-decoration: underline;'>in-text links</a> 
          directly within your paragraphs.
          <br><br>
          You can split paragraphs by just using those 'br' tags above, or:
      </p>

      <p class="prompt-regular" style="font-size: 18px; line-height: 1.6; color: #555;">
          you can also put them in separate 'p' tags it doesnt really matter
      </p>

      <!-- 100% Proportional Image with Caption -->
      <div style="margin: 25px 0; width: 100%;">
        <img src="images/blog-0.jpg" alt="Sample Image Description" style="border-radius: 2px;">
        <span class="prompt-regular" style="font-size: 14px; color: #666; display: block; margin-top: 8px; text-align: center;">
          Figure 1: Example caption for an image
        </span>
      </div>

      <div style="display: inline-flex; width: fit-content; align-items: center;">
          <span class="page-subheader">Video Embed</span>
      </div>

      <!-- 100% Proportional Video Embed -->
      <div style="margin: 25px 0; width: 100%;">
        <iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      
      </div>
    `
  }
];