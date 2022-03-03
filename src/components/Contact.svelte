<script>
    import "../styles/Contact.css";
    import "../styles/media-queries/Contact.css";
    import Api from "../api/Api";
    import {createEventDispatcher} from "svelte";

    export let cut, date, time, actualDate;
    let nameOfCustomer;
    let note;
    let mail;

    let ans;

    const dispatch = createEventDispatcher();

    const sendReq = async () => {
        await Api.bookAppt({
            name: nameOfCustomer,
            mail: mail,
            note: note,
            actualDate: actualDate,
            date: date,
            time: time,
            cut: cut,
        }).then(res => ans = res);

        if (ans.success === true) {
            dispatch('success', {
                obj: ans
            });
        } else {
            dispatch('error', {
                errorMessage: "Hier ist etwas schiefgelaufen, Dein Termin konnte nicht gebucht werden. ☹️",
                errorInfo: "Bitte versuche es erneut! Falls die nochmal passieren sollte, bitte kontaktiere einen Administrator.",
                directTo: ""
            });
        }
    };
</script>

<p>Dein Termin am <span>{date}</span> um <span>{time}</span> für "<span>{cut && cut.split(" (")[0]}</span>" wurde reserviert.</p>
<p>Rechne hierfür mit ungefähr {cut && cut.split("ca.")[1].substr(0, 11)}.</p>
<br />
<h3><span class="important"> Wichtig!</span> Um den Termin zu buchen, brauche ich noch ein paar Infos:</h3>

<!-- Important stuff -->
<div class="important-stuff">
    <span class="name">Dein Name: <span class="r">*</span> </span>
    <input class="name" bind:value={nameOfCustomer} maxlength="32" autocomplete="false">

    <span class="mail">Deine Email: <span class="r">*</span> </span>
    <input class="mail" bind:value={mail} maxlength="128">

    <span class="note">Notiz (optional):</span>
    <textarea class="note" bind:value={note} maxlength="1024" placeholder="Bitte noch Styling, ..."></textarea>

    <button disabled={!nameOfCustomer || !mail} on:click={sendReq}>Termin verbindlich buchen!</button>

    <hr />
    <span class="info">
        Mit dem Buchen eines Termins erklärst Du Dich damit einverstanden, dass ich Deine Email-Adresse benutze, um Dir verschiedene Updates zu Deinem Termin zu geben. Sobald Dein Termin vorbei ist, wird Deine Email-Adresse spätestens zum Abend des gleichen Tages gelöscht und nicht weiter verarbeitet.
        <br/>
        Du erhälst in der Email auch weitere Informationen, falls Du Deinen Termin absagen willst.
        <br />
        <br />
        <b>Falls</b> Du diesen Termin <b>nicht</b> buchen solltest, wird die Reservierung in spätestens 30 Minuten zurückgenommen und wieder zur Buchung freigestellt. Du kannst diesen Termin dann auch erneut reservieren.
        <br />
        <br />
        <a href=".">Neuen Termin buchen</a>
    </span>
</div>
