<script>
    import "./styles/App.css";

    import Dropdown from "./components/Dropdown.svelte";
    import Calendar from "./components/Calendar.svelte";
    import Banner from "./components/Banner.svelte";
    import Api from "./api/Api";
    import Contact from "./components/Contact.svelte";
    import {onMount} from "svelte";
    import Success from "./components/Success.svelte";
    import { Router, Route, navigate } from "svelte-routing";
    import Error from "./components/Error.svelte";
    import Cancel from "./components/Cancel.svelte";
    import Imprint from "./components/Imprint.svelte";
    import "./styles/media-queries/App.css";

    export let url = "";

    let wantedByCustomer;
    let calendar;
    let dateWrapper;
    let welcome;
    let date;
    let contactInfo;
    let datesAvailable = [];
    let time;
    let actualDate;

    let success;
    let errorMessage;
    let errorInfo;
    let directTo;

    const handleDropdownCallback = (event) => {
        wantedByCustomer = event.detail.text;
        calendar.style.display = "grid";
    };

    const handleCalendarCallback = async (event) => {
        date = event.detail.displayText;
        actualDate = event.detail.actualDate;
        datesAvailable = await Api.getFreeTimeslots(actualDate);
        dateWrapper.style.display = "grid";
    };

    const handleDateSet = (event) => {
        const dateLoggedIn = event.detail.text;

        // remove now not relevent stuff
        welcome.style.display = "none";
        calendar.style.display = "none";
        dateWrapper.style.display = "none";
        contactInfo.style.display = "grid";

        time = dateLoggedIn;
    };

    const handleSuccess = (event) => {
        success = event.detail.obj;
        navigate("/success", { replace: true })
    };

    const handleError = (event) => {
        errorMessage = event.detail.errorMessage;
        errorInfo = event.detail.errorInfo;
        directTo = event.detail.directTo;

        navigate("/error", { replace: true })
    };
</script>


<Router url="{url}">
    <Banner />

    <Route path="">
        <div class="wrapper">
            <div class = "welcome-wrapper" bind:this = {welcome}>
                <Dropdown
                        question = "Was soll bei Dir gemacht werden?"
                        values = {["Haarschnitt (ca. 30 Minuten)", "Haarschnitt mit Bartrasur (ca. 60 Minuten)", "Haarschnitt und Augenbrauen (+ Bartrasur, ca. 60 Minuten)"]}
                        continueText = "Weiter"
                        on:done = {handleDropdownCallback}
                />
            </div>

            <div class = "main-wrapper" bind:this = {calendar}>
                <Calendar wanted = {wantedByCustomer} on:done = {handleCalendarCallback} />
            </div>

            <div class = "specific-date-wrapper" bind:this = {dateWrapper} >
                <span class="normal">Für {date} gibt es noch folgende freie Termine:</span>
                <span class="small">Freie Termine:</span>
                <Dropdown
                        question = ""
                        values = {datesAvailable}
                        continueText = "Termin reservieren"
                        on:done = {handleDateSet}
                />
            </div>

            <div class="contact-info-wrapper" bind:this = {contactInfo}>
                <Contact
                        cut = {wantedByCustomer}
                        actualDate = {actualDate}
                        date = {date}
                        time = {time}
                        on:success = {handleSuccess}
                        on:error = {handleError}
                />
            </div>
        </div>
    </Route>
    <Route path="success">
        <Success obj={success} />
    </Route>
    <Route path="error">
        <Error errorMessage={errorMessage} errorInfo={errorInfo} directTo={directTo}/>
    </Route>
    <Route path="cancel">
        <Cancel on:success = {handleSuccess} on:error = {handleError}/>
    </Route>
    <Route path="imprint">
        <Imprint />
    </Route>
</Router>

<style>
    div.wrapper > div.main-wrapper {
        display: none;
    }

    div.wrapper > div.specific-date-wrapper {
        display: none;
        justify-content: center;
        align-content: center;
        margin-top: 20px;
    }

    div.wrapper > div.specific-date-wrapper > span {
        margin-bottom: -20px;
    }

    div.wrapper > div.specific-date-wrapper > span.small {
        display: none;
    }

    div.wrapper > div.contact-info-wrapper {
        display: none;
        justify-content: center;
        align-content: center;
    }
</style>
