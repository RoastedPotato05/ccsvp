// Every blog post must be stored in this 'posts' array
// Each post will have an 'id', 'hidden' (boolean to hide the post's card from the listing), 'card' (containing title, description, topic, date, thumbnail), and 'content' (HTML content for the post)
// Increment the id for each new blog post, they are displayed in the 'Blog' screen in descending order
  // In the 'card' object, there are a few properties:
  // 'title': the title of the blog post, will show up in both the card AND the full post
  // 'description': a short description of the blog post, only appears in the card view
  // 'topic': the topic or category of the blog post, the value of this property will be added dynamically to the filter dropdown on the main Blog screen
  // 'date': the date
  // (optional) 'thumbnail': path to whatever thumbnail image, and is also used as the large image in the full blog page

const posts = [
  {
    id: "0",
    hidden: false,
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
          This is an introductory paragraph demonstrating standard body copy. You can easily include 
            <a href='https://example.com' class='blue-text' style='text-decoration: underline;'>in-text links</a> 
          directly within your paragraphs.

          <br><br>

          You can split paragraphs by just using those 'br' tags above, or:
      </p>

      <p class="prompt-regular" style="font-size: 18px; line-height: 1.6; color: #555;">
          you can also put them in separate 'p' tags it doesnt really matter
      </p>


      <div style='margin-bottom: 20px; width:50%;'>
        <img src='images/blog-0.jpg' alt='Sample Image Description' style='width: 100%; height: auto; display: block; border-radius: 2px;'>
        <span class='prompt-regular' style='font-size: 14px; color: #666; display: block; margin-top: 8px; text-align: center;'>
          Figure 1: Example caption for an image
        </span>
      </div>

      <div style="display: inline-flex; width: fit-content; align-items: center;">
          <span class="page-subheader">Video Embed</span>
      </div>

      <div style="margin: 25px 0;">
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      
      </div>
      
    `
  },
  {
    id: "1",
    hidden: false,
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
          This is an introductory paragraph demonstrating standard body copy. You can easily include 
            <a href='https://example.com' class='blue-text' style='text-decoration: underline;'>in-text links</a> 
          directly within your paragraphs.

          <br><br>

          You can split paragraphs by just using those 'br' tags above, or:
      </p>

      <p class="prompt-regular" style="font-size: 18px; line-height: 1.6; color: #555;">
          you can also put them in separate 'p' tags it doesnt really matter
      </p>


      <div style='margin-bottom: 20px; width:50%;'>
        <img src='images/blog-0.jpg' alt='Sample Image Description' style='width: 100%; height: auto; display: block; border-radius: 2px;'>
        <span class='prompt-regular' style='font-size: 14px; color: #666; display: block; margin-top: 8px; text-align: center;'>
          Figure 1: Example caption for an image
        </span>
      </div>

      <div style="display: inline-flex; width: fit-content; align-items: center;">
          <span class="page-subheader">Video Embed</span>
      </div>

      <div style="margin: 25px 0;">
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>      
      </div>
      
      `
  }
];