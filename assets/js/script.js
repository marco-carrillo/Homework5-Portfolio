// Find out which time it is

function get_military_hour() {

    var hour=parseInt(moment().format('hh'));
    var am_or_pm=moment().format('a');
    
    if (am_or_pm==="pm"){
        if (hour===12) {return hour}
        else {return hour+12}

    } else {
        if (hour===12) {return 0;}
        else {return hour};
    }
}



document.getElementById("DisplayDate").textContent=moment().format('MMMM Do YYYY, h:mm:ss a');
var current_hour=parseInt(moment().format('hh'));
var am_or_pm=moment().format('a');

// write local time to the webpage
