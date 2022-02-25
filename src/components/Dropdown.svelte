<script>
    import "../styles/Dropdown.css";
    import { createEventDispatcher } from 'svelte';

    export let values, question, continueText;
    let selected = values[0];

    const dispatch = createEventDispatcher();

    const handleSubmit = () => {
        dispatch('done', {
            text: selected
        });
    };

</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="dropdown-wrapper">
    <h1>{question}</h1>

        <select value={values[0]} on:change="{(e) => selected = e.target.value}">
            {#each values as value}
                <option value={value}>
                    {value}
                </option>
            {/each}
        </select> <br />
        <button type=submit disabled={!selected || selected === "Bitte wähle eine Uhrzeit aus..."}>
            {continueText}
        </button>
    </div>
</form>
