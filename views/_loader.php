
<div id="pl_left"></div>
<div id="pl_right"></div>
<div id="pl_spin">
    <div class="loader"></div>
</div>

<script>
    window.onload = function () {

        setTimeout(function () {

            document.getElementById('pl_left').className = 'loaded_left';
            document.getElementById('pl_right').className = 'loaded_right';
            document.getElementById('pl_spin').className = 'loaded_spin';

        }, 3000);
    };
</script>