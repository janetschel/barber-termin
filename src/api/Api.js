const getFreeTimeslots = async (date) => {
    return ["Bitte wähle eine Uhrzeit aus...", "1 Uhr" , "2 Uhr", " 3 Uhr"];
}

const bookAppt = async (obj) => {
    return {
        success: true,
        id: 1,
        ...obj
    }
};

const cancelAppt = async (id) => {
    return true;
};

const Api = {
    getFreeTimeslots,
    bookAppt,
    cancelAppt,
};

export default Api;
