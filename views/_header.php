<header>
    <script src="/template/js/header.js"></script>
    <div>
        <span id="selfie_span" class="menu" onclick="H.selfiePage()">
            Selfie
        </span>
    </div>

    <div>
        <span id="gallery_span" class="menu" onclick="H.galleryPage()">
            Gallery
        </span>
    </div>

    <div>
        <span id="search_span" class="menu" onclick="H.searchShow()">
            Search
        </span>
        <input type="text" id="search_input" maxlength="15" placeholder="type smth" onblur="H.searchHide()">
        <ul id="search_drop_down">
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
        </ul>
    </div>
 
    <div>
        <span id="sign_out_span" class="menu" onclick="H.signOut()">
            Sign Out
        </span>
    </div>
    <script>H.initialization();</script>
</header>