<script>
    import "../styles/Error.css";
    import { Link } from "svelte-routing";

    export let errorMessage, errorInfo, directTo;
</script>

<div class="error">
    <span class="errorMessage">{errorMessage}</span>
    <span class="errorInfo">{errorInfo}</span>
    <Link to={directTo} class="back">Erneut versuchen</Link>
</div>
