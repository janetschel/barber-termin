<script>
    import "../styles/Cancel.css";
    import "../styles/media-queries/Cancel.css";
    import {createEventDispatcher} from "svelte";
    import Api from "../api/Api";

    let id;
    let result;
    let confirmText;
    let waiting;

    const dispatch = createEventDispatcher();

    const cancel = async () => {
        waiting.style.display = "block";
        await Api.cancelAppt(id).then(res => result = res);

        if (result) {
            waiting.style.display = "none";
            confirmText.style.display = "block";
        } else {
            dispatch('error', {
                errorMessage: "Termin konnte nicht abgesagt werden, da Deine ID nicht existiert.",
                errorInfo: "Wenn Du Deinen Termin wirklich absagen willst, kontrolliere bitte Deine eingegebene ID",
                directTo: "cancel"
            });
        }

    };
</script>

<div class="cancel">
    <span class="info normal">Bitte gib die ID zu Deinem Termin ein, um diesen abzusagen: <span class="r">*</span></span>
    <span class="info small">Termin-ID: <span class="r">*</span></span>

    <input class="id" bind:value={id} maxlength="32">

    <button disabled={!id} on:click={cancel}>Termin absagen</button>

    <span class="waiting" bind:this = {waiting}>Sage Termin ab...</span>
    <span class="confirm" bind:this = {confirmText}>Termin erfolgreich abgesagt. ✅</span>
</div>

<style>
    span.confirm {
        display: none;
    }
    span.waiting {
        display: none;
    }
    span.small {
        display: none;
    }
</style>
