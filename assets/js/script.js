//********************************************************************//
//  Handles clicks.  Meaning, the user wanted to save that specific   //
//  hour activity.  Only that row is saved, rather than the entire    //
//  rows, since a button is specific to the hour slot assigned.       //
//********************************************************************//

function saves_row(event){

    // first, gets which button got clicked (last digit of the button id)
    var button_clicked=event.currentTarget.id[event.currentTarget.id.length-1]

    // Now, it will retrieve the data, update the memory variable and write to local storage
    scheduler_data[parseInt(button_clicked)]=$("#textarea"+button_clicked).val();
    localStorage.setItem("scheduler_data",JSON.stringify(scheduler_data));


}  // end of function saves_row

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
}  // end of function get_military_hour

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

var current_hour=get_military_hour()-6;

//**********************************************************************/
//  activity on the table is stored in a matrix of strings.
//  Index is current hour-9.  Thus, 9AM is stored in element 9-9=0
//  Content of the string is the activity description
//**********************************************************************/

// Refreshes the 8 timeslots for the calendar

for(var i=0;i<9;i++){

    var text_name="#textarea"+i.toString();    // Id of the text area
    var button_name="#button"+i.toString();    // ID of the button

    if(current_hour-i-9>0) {   // That means the current slot is in the past, disable text and button
        $(text_name).prop("disabled",true);                     // disables text input
        $(text_name).attr("class","form-control text-past");    // formatting text in the past
        $(button_name).prop("disabled",true)                    // disables button
        $(button_name).attr("class","btn btn-block btn-secondary btn-fmt")   // formatting button
    } else if(current_hour-i-9===0){  // This means the current slot is the current hour
        $(text_name).prop("disabled",false);                    // enables text input
        $(text_name).attr("class","form-control text-current");  // formatting text in the present
        $(button_name).prop("disabled",false)                    // enables button
        $(button_name).attr("class","btn btn-block btn-danger btn-fmt btn-clickable")  // formatting button
    } else {  // This means the current slot (index+8) happens in the future.
        $(text_name).prop("disabled",false);                    // enables text input
        $(text_name).attr("class","form-control text-future");  // formatting text in the future
        $(button_name).prop("disabled",false)                    // enables button
        $(button_name).attr("class","btn btn-block btn-info btn-fmt btn-clickable")  // formatting button
    }

    $(".btn").off("click")                             // eliminating any click handlers from all buttons
     // Adding click events for present and future buttons

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
    if(seconds===0){                                         // Exactly when the clock changes from one minute to the next
        clearInterval(IntervalHandler);                      // Clears the 1 second interval
        handle_minute();                                     // refreshes time
        Interval_Handler=setInterval(handle_minute,60000);   // Sets the interval to each minute and the function to handle it
    }
}    //  end of function set_initial_interval 

//****************************************************************************************** */
//  Main program functionality.  The following area sets up the events so that it can
//  properly function.  
//****************************************************************************************** */

handle_minute();                                            // Initial page loading
var scheduler_data=JSON.parse(localStorage.getItem("scheduler_data"));  // retrieves data from local storage

//  If no data exists then it creates empty storage
if (scheduler_data===null){
    alert ("data is empty");
    var scheduler_data=["0","1","2","3","4","5","6","7","8"];
    localStorage.setItem("scheduler_data",JSON.stringify(scheduler_data));
}

// loads data to the screen

for (var i=0;i<8;i++){
    $("#textarea"+i).val(scheduler_data[i]);
}

// Initial time interval, every second, until minute changes
var IntervalHandler=setInterval(set_initial_interval,1000); 

//  Setting the on-click event so that when any clickable button is pressed, the function handles it
$(".btn-clickable").on("click",saves_row);