
//********************************************/
// When called, returns military time hour   */
// no parameter needed                       */
//********************************************/

function get_military_hour() {
    var hour=parseInt(moment().format('hh'));
    var am_or_pm=moment().format('a');
    
    if (am_or_pm==="pm"){
        if (hour===12) {return hour;}
        else {return hour+12;}

    } else {
        if (hour===12) {return 0;}
        else {return hour};
    }
}

//**************************************************************************/
// The following function handles the timer.  Overall responsibilities:    */
// 1.  refreshes date and time every minute                                */
// 2.  finds the current time, and based on it                            */
//     2.a  Disables past time                                             */
//     2.b  Formats in red current hour                                    */
//     2.c  Enables future time                                            */
//************************************************************************ */


function handle_minute() {
// updating time and date --Just in case date is changed, it refreshes both date and time, not just time

document.getElementById("DisplayDate").textContent=moment().format('MMMM Do YYYY');
document.getElementById("TimeShown").textContent="Time -- "+moment().format('h:mm a');

//  get current time in military time (0 to 23 hours)

var current_hour=get_military_hour();

var secs=parseInt(moment().format('ss'));
console.log(secs);


//**********************************************************************/
//  activity on the table is stored in a matrix of strings.
//  Index is current hour-9.  Thus, 8 hours is stored in element 0
//  Content of the string is the activity description
//**********************************************************************/

// Refreshes the styles of the calendar

for(var i=0;i<9;i++){

    if(current_hour-i-9>0) {   // That means the current slot (index+8) is in the past, disable it
        document.getElementById(i.toString()).setAttribute("class","row border hr-past")
    } else if(current_hour-i-9===0){  // This means the current slot is the current hour
        document.getElementById(i.toString()).setAttribute("class","row border hr-current")
    } else {  // This means the current slot (index+8) happens in the future.
        document.getElementById(i.toString()).setAttribute("class","row border hr-future")
    }
}

} //  Ends function handle_minute()


//**********************************************************************/
//   The following function is setup initially to monitor when  
//   the minute changes.  It is called every second, but once it
//   detects the first minute change, it will set the interval to a 
//   minute interval (starting when the clock changes), so that it can
//   refresh the time and attributes every minute
//   This function is only used during the first minute, and doesn't
//   get used anymore
//**********************************************************************/

function set_initial_interval(){

    var seconds=parseInt(moment().format('ss'));
    console.log(seconds);

    if(seconds===0){   // Exactly when the clock changes minute
        console.log("cleaning stuff")
        clearInterval(IntervalHandler);  // Clears the 1 second interval
        handle_minute();                 // refreshes time
        Interval_Handler=setInterval(handle_minute,60000);   //  Sets the interval to each minute
    }
}    //  end of function set_initial_interval 

//****************************************************************************************** */
//  Main program functionality.  The following area sets up the events so that it can
//  properly function.  
//****************************************************************************************** */

handle_minute();                            // Initial writing, gets the time and posts it

var IntervalHandler=setInterval(set_initial_interval,1000);


// write local time to the webpage
