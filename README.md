# Purpose of the application

This application allows users to plan a full week of their calendars.  The user can select any day of the week that they want to work with.  Users can see all of the days from Sunday through Saturdaycan see any day of this week (from Sunday through Saturday) of the current week.

## Functionality

The application initially loads the data for the day in which the application is run.  For example, if the user runs this application on Wednesday, then Wednesday data is originally presented to the user.

The user has the option of choosing any other day of their week by clicking on the horizontal buttons on top.  Loading a day in the past, brings that day, but the data can't be edited.  Bringing a day in the future will allow the user to edit any information since that day is in the future.

When working with the current day, the user will be able to edit any activity that is in the current hour or a future hour.  For example, if the user loads the page at 2:15PM, all time slots from 9:00 AM to 1:00PM will be disabled for editing.  Time slot for 2PM will be enabled for editing (under a red background) and all time slots lated than 2PM will be enabled for editing.

When editing an activity, that activity is updated to temporary memory.  To make it permanent, the user needs to click the "save" button which is located next to each activity slot.  If the user changes the text of any time slot, but doesn't save it, the contents will be lost if the user were to exit the browser.

IMPORTANT:  If a user edits the context of a time slot, say 10AM, then moves to edit another time slot, say 11AM and saves 11AM, the changes to the 11AM time slot are updated, but the changes to the 10AM time slot are reverted back.  This is to avoid the user into editing all of the time slots, and then saving the last edited time slot and believe they have saved all changes made.  Remember, each save button is specific to the time slot allowed.

Once the user has edited the activity description and clicked on the corresponding save button, either one of two things will happen:  a) the system will isssue a pop-up message telling the user changes have been saved, or b) Nothing will happen other than saving of the data.  These actions will depend on whether the "Allow messages" option is checked (default) or not.

##  Data shown to the user

The application provides the following data

1) The time in Hours and minutes
2) The day of the week, and date
3) Allows the user to not receive messages (Allow message check-box)
4) Current day of the week being displayed (default is the day in which the application is run)
5) Description of each planned activity at each hour

## APIs and libraries used in this application

We used the following libraries:

1) Moment.js to get functionality of time
2) JQuery confirm libary to run pop-ups
