<script>
    import "../styles/Calendar.css";

    import DatePicker from "@beyonk/svelte-datepicker/src/components/DatePicker.svelte";
    import {dayjs} from "@beyonk/svelte-datepicker/src/components/lib/date-utils"
    import {createEventDispatcher} from "svelte";

    export let wanted;

    // noinspection JSCheckFunctionSignatures
    const formatter = new Intl.DateTimeFormat('de', { dateStyle: "full" });

    const dispatch = createEventDispatcher();

    const handleSelect = (event) => {
        const selectedDate = event.detail.date;
        dispatch('done', {
            displayText: formatter.format(selectedDate),
            actualDate: selectedDate
        });
    }
</script>


<div class="calendar-wrapper">
    <span class="normal">Wähle einen Tag  für "{wanted && wanted.split(" (")[0]}" aus, der Dir passt:</span>
    <span class="small">Wähle einen Tag:</span>

    <DatePicker
            placeholder = "Auswählen..."
            format = "DD.MM.YYYY"
            continueText = "Auswählen"
            start = {dayjs().add(0, "day")}
            end = {dayjs().add(1, "month")}
            on:date-selected = {(e) => handleSelect(e)}
    />
    <br />
</div>

<style>
    div.calendar-wrapper > span.small {
        display: none;
    }
</style>
