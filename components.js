class SiteTopbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="topbar-container">
                <div class="red-bg" style="display: flex; height: 100%; flex: 1 1 0px; border-bottom: #8b2a2a 8px solid;"></div>

                <div class="red-bg topbar-center">
                    <a href="/index.html" style="font-size: 34px; color: white; font-weight: 600; letter-spacing: 2px; text-decoration: none;" class="michroma-regular">CCSVP</a>

                    <button class="topbar-hamburger-btn" id="topbar-hamburger-btn" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div class="topbar-links-wrapper" id="topbar-links-wrapper">
                        <!-- ABOUT DROPDOWN CONTAINER -->
                        <div id="about-dropdown-container" class="dropdown-container" style="position: relative; display: inline-block; height: 70px;">
                            <button id="about-dropdown-btn" class="topbar-btn" style="height: 70px; display:flex; align-items: center;">
                                ABOUT <span id="about-dropdown-arrow" class="dropdown-arrow"></span>
                            </button>
                            
                            <!-- DROPDOWN MENU -->
                            <div id="about-dropdown-menu" class="dropdown-menu" style="display: flex; opacity: 0; visibility: hidden; transition: opacity 0.1s ease-in-out, visibility 0.1s ease-in-out; position: absolute; top: 70px; left: 0; width: 100%; box-sizing: border-box; background-color: #8b2a2a; box-shadow: 0px 8px 16px rgba(0,0,0,0.25); z-index: 1000; flex-direction: column;">
                                <a href="/about/services.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Services</a>
                                <a href="/about/mission.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Mission</a>
                                <a href="/about/contact.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px;">Contact</a>
                            </div>
                        </div>
                        
                        <!-- PROJECTS DROPDOWN CONTAINER -->
                        <div id="projects-dropdown-container" class="dropdown-container" style="position: relative; display: inline-block; height: 70px;">
                            <button id="projects-dropdown-btn" class="topbar-btn" style="height: 70px; display:flex; align-items: center;">
                                PROJECTS & RESEARCH <span id="projects-dropdown-arrow" class="dropdown-arrow"></span>
                            </button>
                            
                            <!-- DROPDOWN MENU -->
                            <div id="projects-dropdown-menu" class="dropdown-menu" style="display: flex; opacity: 0; visibility: hidden; transition: opacity 0.1s ease-in-out, visibility 0.1s ease-in-out; position: absolute; top: 70px; left: 0; width: 100%; box-sizing: border-box; background-color: #8b2a2a; box-shadow: 0px 8px 16px rgba(0,0,0,0.25); z-index: 1000; flex-direction: column;">
                                <a href="/projects-research/emergency-reports.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Emergency Reports</a>
                                <a href="/projects-research/data-analytics.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Data Analytics</a>
                                <a href="/projects-research/virtual-reality.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Virtual Reality</a>
                                <a href="/projects-research/llm-interface.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px;">LLM Interface</a>
                            </div>
                        </div>

                        <a href="/people.html" id="people-dropdown-btn" class="topbar-btn" style="height: 70px; display:flex; align-items: center;">
                            PEOPLE
                        </a>

                        <a href="/blog.html" id="blog-dropdown-btn" class="topbar-btn" style="height: 70px; display:flex; align-items: center;">
                            BLOG
                        </a>
                    </div>
                </div>

                <div class="red-bg" style="display: flex; height: 100%; flex: 1 1 0px; border-bottom: #8b2a2a 8px solid;"></div>
            </div>
        `;

        const hamburgerBtn = this.querySelector('#topbar-hamburger-btn');
        const linksWrapper = this.querySelector('#topbar-links-wrapper');
        if (hamburgerBtn && linksWrapper) {
            hamburgerBtn.addEventListener('click', () => {
                linksWrapper.classList.toggle('open');
            });
        }
    }
}
customElements.define('site-topbar', SiteTopbar);