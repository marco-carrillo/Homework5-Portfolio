//*******************************************************************/
// When called, this functions sets up all functionality needed to  */
// enter and edit the activity for the hour.                        */
//*******************************************************************/

function edit_activity(number){

    button_clicked=event.currentTarget.id[event.currentTarget.id.length-1];  // Buttom clicked.  Button0=9AM, Button1=10AM......Button8=5PM
    var form_object=$("<form>");                          // creating new form object
    $("#container"+button_clicked).prepend(form_object);  // appending the form

    var new_text=$("<input>");                            // Within that form, we will add a text input field
    new_text.attr("class","form-control");                // Setting class to form-control

    new_text.attr("value",$("#activity"+button_clicked).text());  // Setting the value of the input form to the text
    $("#activity"+button_clicked).hide();               // hides the text so that a form can be inputed
    form_object.append(new_text);                       // The text input takes the place of the description
    event.preventDefault();

    console.log(new_text.value);
    // waits until the user presses enter.  Once it does, then updates the attribution
    $("#activity"+button_clicked).text(new_text.value);

    alert(new_text.value);
    // <input id="activity8" class="form-control" type="text" placeholder="Readonly input here...">
    // <h6 id="activity8" style="display: none;">Activity description goes here</h6>
}


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

var current_hour=get_military_hour()-8;

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
        $(button_name).attr("class","btn btn-block btn-danger btn-fmt")  // formatting button
    } else {  // This means the current slot (index+8) happens in the future.
        $(text_name).prop("disabled",false);                    // enables text input
        $(text_name).attr("class","form-control text-present");  // formatting text in the present
        $(button_name).prop("disabled",false)                    // enables button
        $(button_name).attr("class","btn btn-block btn-info btn-fmt")  // formatting button
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
var IntervalHandler=setInterval(set_initial_interval,1000); // Initial time interval, every second, until minute changes