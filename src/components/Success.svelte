<script>
    import "../styles/Success.css";
    import {Link} from "svelte-routing";

    export let obj;
    console.log(obj)
</script>

<div class="success">
    <h2>Dein Termin am {obj.date} um {obj.time} wurde <span class="important">erfolgreich</span> gebucht.</h2>
    <h3>Deine ID zum Termin lautet <span class="important">{obj.id}</span>. Falls Du Deinen Termin absagen willst, merke Dir diese ID!</h3>
    <span>Es wurde eine E-Mail an {obj.mail} verschickt, welche genauere Informationen beinhaltet. Vielen Dank!</span>

    <Link to="" class="back">Zurück zur Startseite</Link>
</div>
