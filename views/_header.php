<header>
    <script src="/template/js/header.js"></script>
    <div>
        <span id="selfie_span" class="menu" onclick="selfiePage()">
            Selfie
        </span>
    </div>

    <div>
        <span id="gallery_span" class="menu" onclick="galleryPage()">
            Gallery
        </span>
    </div>

    <div>
        <span id="search_span" class="menu" onclick="searchShow()">
            Search
        </span>
        <input type="text" id="search_input" placeholder="type smth" onblur="searchHide()" onkeypress="searchStart()">
    </div>
 
    <div>
        <span id="sign_out_span" class="menu" onclick="signOut()">
            Sign Out
        </span>
    </div>
</header>