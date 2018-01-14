<header>
    <script src="/template/js/header.js"></script>
    <div>
        <a class="menu_link" onclick="H.selfiePage()">
            Selfie
        </a>
    </div>

    <div>
        <a class="menu_link" onclick="H.galleryPage()">
            Gallery
        </a>
    </div>

    <div>
        <a id="search_button" class="menu_link" onclick="H.searchShow()">
            Search
        </a>
        <input id="search_input" class="form-control header_input" maxlength="15" placeholder="Search" onblur="H.searchHide()">
        <ul id="search_drop_down" class="header_dd">
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
            <li class="search_login" onmousedown="H.searchRedirect(this.innerHTML);"></li>
        </ul>
    </div>
 
    <div>
        <a class="menu_link" onclick="H.signOut()">
            <?php
                if (!isset($_SESSION))
                    session_start();
                if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id']))
                    echo 'Sign Out';
                else
                    echo 'Sign In';
            ?>
        </a>
    </div>
    <script>H.initialization();</script>
</header>
