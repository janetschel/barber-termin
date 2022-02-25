<script>
    import "../styles/Banner.css";
    import "../styles/media-queries/Banner.css";
    import {Link} from "svelte-routing";
</script>

<div class="banner">
    <Link to="" class="home"><h1>Deloos Terminbuchung 💈</h1></Link>
    <Link to="" class="home-small"><h1>Deloo</h1></Link>
    <Link to="cancel" class="cancel-termin"><span>Termin absagen</span></Link>
    <Link to="imprint" class="imprint"><span>Impressum</span></Link>
</div>

<style>
    div.banner > .home-small {
        display: none;
    }
</style>
