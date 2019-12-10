//************************************************************************//
//  Handles when the dropdown is selected so that the day can be changed
//************************************************************************//

function changes_day(){
    day_index=parseInt(event.currentTarget.id[event.currentTarget.id.length-1]);   // updates which day is loaded
    console.log("current day",day_index)
    console.log("today",today_index)

    scheduler_day=scheduler_data[day_index];                                       // loads saved data to current day data

    for (var i=0;i<9;i++){                                                         // loads new data to the screen
        $("#textarea"+i).val(scheduler_day[i]);
    }
    handle_minute()                                                                //  Calls to format screen

}  // end of function changes_day

//********************************************************************//
//  Handles clicks.  Meaning, the user wanted to save that specific   //
//  hour activity.  Only that row is saved, rather than the entire    //
//  rows, since a button is specific to the hour slot assigned.       //
//********************************************************************//

function saves_row(event){

    var button_clicked=event.currentTarget.id[event.currentTarget.id.length-1]      // which button was clicked?
    scheduler_day[parseInt(button_clicked)]=$("#textarea"+button_clicked).val();    // updating the new activity data 
    scheduler_data[day_index]=scheduler_day;                                        // Updating week data
    localStorage.setItem("scheduler_data",JSON.stringify(scheduler_data));          // saving to local storage

    for (var i=0;i<9;i++){                                                           // refreshing entire screen page
        $("#textarea"+i).val(scheduler_day[i]);
    }

    if($("#confirm_msgs").is(":checked")){                                           //  If user enabled, saved message displayed
        $.confirm({                                                            
            title: 'Data saved for '+time_slots[button_clicked],
            content: "Your edits to the activity for this time slot have been saved!!!!",
            type: 'green',
            typeAnimated: true,
            buttons: {
                close: function () {
                }
            }
        });
    }

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

//***************************************************************************************/
// The following function handles the timer.  Overall responsibilities:                 */
// 1.  refreshes date and time every minute                                             */
// 2.  finds the current time, and based on it                                          */
//     2.a  Disables past time                                                          */
//     2.b  Formats in red current hour                                                 */
//     2.c  Enables future time                                                         */
// DOESNOT load and/or refreshes data.  This is responsibility of the calling function  */
//***************************************************************************************/

function handle_minute() {

    // updating time and date --Just in case date is changed, it refreshes both date and time, not just time

$("#TimeShown").text("Time -- "+moment().format('h:mm a'));         // Shows time

//  get current time in military time (0 to 23 hours)

var current_hour=get_military_hour();

//**********************************************************************/
//  activity on the table is stored in a matrix of strings.
//  Index is current hour-9.  Thus, 9AM is stored in element 9-9=0
//  Content of the string is the activity description
//**********************************************************************/

// Refreshes the 8 timeslots for the calendar

for(var i=0;i<9;i++){

    var text_name="#textarea"+i.toString();    // Id of the text area
    var button_name="#button"+i.toString();    // ID of the button

    if(day_index<today_index){            // Day selected by user is in the past.  All time slots disabled
        $(text_name).prop("disabled",true);                                  // disables text input
        $(text_name).attr("class","form-control text-past");                 // formatting text in the past
        $(button_name).prop("disabled",true)                                 // disables button
        $(button_name).attr("class","btn btn-block btn-secondary btn-fmt")   // formatting button
    }  else if (day_index>today_index){  // Day selected by user is in the future.  All time slots enabled
        $(text_name).prop("disabled",false);                                 // enables text input
        $(text_name).attr("class","form-control text-future");               // formatting text in the future
        $(button_name).prop("disabled",false)                                // enables button
        $(button_name).attr("class","btn btn-block btn-info btn-fmt btn-clickable")  // formatting button
    }  else {                            // Day selected by user is today.  Need to evaluate each time slot based on time
            if(current_hour-i-9>0) {    // That means the current slot is in the past, disable text and button
                $(text_name).prop("disabled",true);                                  // disables text input
                $(text_name).attr("class","form-control text-past");                 // formatting text in the past
                $(button_name).prop("disabled",true)                                 // disables button
                $(button_name).attr("class","btn btn-block btn-secondary btn-fmt")   // formatting button
            } else if(current_hour-i-9===0){  // This means the current slot is the current hour
                $(text_name).prop("disabled",false);                                 // enables text input
                $(text_name).attr("class","form-control text-current");              // formatting text in the present
                $(button_name).prop("disabled",false)                                // enables button
                $(button_name).attr("class","btn btn-block btn-danger btn-fmt btn-clickable")  // formatting button
            } else {  // This means the current slot (index+8) happens in the future.
                $(text_name).prop("disabled",false);                                 // enables text input
                $(text_name).attr("class","form-control text-future");               // formatting text in the future
                $(button_name).prop("disabled",false)                                // enables button
                $(button_name).attr("class","btn btn-block btn-info btn-fmt btn-clickable")  // formatting button
            }
    }  // end of else - in case user selected today
}  // End for loop

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

// ****************************************************************************************** */
//  Main program functionality.  The following area sets up the events so that it can
//  properly function.  
// ****************************************************************************************** */


var time_slots=["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM"];           // time slots available
var DoW=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];    // Days of week for dropdown
var today_index=DoW.indexOf(moment().format('dddd'));                                // Which day is today?  Doesn't change
var day_index=today_index;                                                             // current day displayed.  user can change it
$("#daylabel"+day_index).prop("checked",true);                                       // shows which day of week is today
handle_minute();                                                                     // Initial page loading
$("#DisplayDate").text(moment().format('dddd MMMM Do YYYY'));                        // Shows date


var scheduler_data=JSON.parse(localStorage.getItem("scheduler_data"));      //  retrieves data from local storage
if (scheduler_data===null){                                                 //  If no data exists then it creates empty storage
    var scheduler_day=["","","","","","","","",""];                         //  scheduler_day=data for the current day selected 
    var scheduler_data= new Array(7);                                       //  scheduler_data=data for the entire week (7 days)
    for(var i=0;i<7;i++){ scheduler_data[i]=new Array(9)}
    localStorage.setItem("scheduler_data",JSON.stringify(scheduler_data));  // stores empty array to local storage
}

scheduler_day=scheduler_data[day_index];                                    // Retrieving data for today
for (var i=0;i<9;i++){                                                      // loads data to the screen
    $("#textarea"+i).val(scheduler_day[i]);
}

var IntervalHandler=setInterval(set_initial_interval,1000);                 // Initial time interval, every second, until minute changes
$(".btn-clickable").on("click",saves_row);                                  //  Setting the on-click event so that when any clickable button is pressed, the function handles it
$('.dow').on('click',changes_day);                                          // Setting the event for day drop-down