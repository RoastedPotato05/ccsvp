class SiteTopbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div style="display: flex; flex-direction: row; height: 70px; box-sizing: border-box;">
               <div class="red-bg" style="display: flex; height: 100%; flex: 1 1 0px; border-bottom: #8b2a2a 8px solid;"></div>

                <div class="red-bg" style="display: flex; height: 100%; flex: 0 1 300px; padding: 0px 20px; align-items: center; border-bottom: #8b2a2a 8px solid;">
                    <a href="/ccsvp/index.html" style="font-size: 40px; color: white; font-weight: 600; letter-spacing: 2px; text-decoration: none;" class="michroma-regular">CCSVP</a>
                </div>
                
                <div class="red-bg" style="display: flex; height: 100%; flex: 0 1 1250px; padding: 0px 20px; align-items: center; justify-content: right; border-bottom: #8b2a2a 8px solid;">
                    <div style="flex-direction: row; display: flex;">

                        <!-- ABOUT DROPDOWN CONTAINER -->
                        <div id="about-dropdown-container" class="dropdown-container" style="position: relative; display: inline-block; height: 70px;">
                            <button id="about-dropdown-btn" class="topbar-btn" style="height: 70px; display:flex; align-items: center;">
                                ABOUT <span id="about-dropdown-arrow" class="dropdown-arrow"></span>
                            </button>
                            
                            <!-- DROPDOWN MENU -->
                            <div id="about-dropdown-menu" class="dropdown-menu" style="display: flex; opacity: 0; visibility: hidden; transition: opacity 0.1s ease-in-out, visibility 0.1s ease-in-out; position: absolute; top: 70px; left: 0; width: 100%; box-sizing: border-box; background-color: #8b2a2a; box-shadow: 0px 8px 16px rgba(0,0,0,0.25); z-index: 1000; flex-direction: column;">
                                <a href="/ccsvp/about/services.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Services</a>
                                <a href="/ccsvp/about/mission.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Mission</a>
                                <a href="/ccsvp/about/contact.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px;">Contact</a>
                            </div>
                        </div>
                        
                        <!-- PROJECTS DROPDOWN CONTAINER -->
                        <div id="projects-dropdown-container" class="dropdown-container" style="position: relative; display: inline-block; height: 70px;">
                            <button id="projects-dropdown-btn" class="topbar-btn" style="height: 70px; display:flex; align-items: center;">
                                PROJECTS & RESEARCH <span id="projects-dropdown-arrow" class="dropdown-arrow"></span>
                            </button>
                            
                            <!-- DROPDOWN MENU -->
                            <div id="projects-dropdown-menu" class="dropdown-menu" style="display: flex; opacity: 0; visibility: hidden; transition: opacity 0.1s ease-in-out, visibility 0.1s ease-in-out; position: absolute; top: 70px; left: 0; width: 100%; box-sizing: border-box; background-color: #8b2a2a; box-shadow: 0px 8px 16px rgba(0,0,0,0.25); z-index: 1000; flex-direction: column;">
                                <a href="/ccsvp/projects-research/emergency-reports.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Emergency Reports</a>
                                <a href="/ccsvp/projects-research/data-analytics.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Data Analytics</a>
                                <a href="/ccsvp/projects-research/virtual-reality.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px; border-bottom: 1px solid rgba(255,255,255,0.15);">Virtual Reality</a>
                                <a href="/ccsvp/projects-research/llm-interface.html" class="prompt-regular menu-btn" style="color: white; padding: 15px 20px; text-decoration: none; display: block; font-size: 16px;">LLM Interface</a>
                            </div>
                        </div>

                        <a href="/ccsvp/people.html" id="people-dropdown-btn" class="topbar-btn menu-btn" style="height: 70px; display:flex; align-items: center;">
                            PEOPLE <span id="people-dropdown-arrow" class=""></span>
                        </a>

                        <a href="/ccsvp/blog.html" id="blog-dropdown-btn" class="topbar-btn menu-btn" style="height: 70px; display:flex; align-items: center;">
                            BLOG <span id="blog-dropdown-arrow" class=""></span>
                        </a>
                    </div>
                </div>

                <div class="red-bg" style="display: flex; height: 100%; flex: 1 1 0px; border-bottom: #8b2a2a 8px solid;"></div>
            </div>
        `;
    }
}
customElements.define('site-topbar', SiteTopbar);