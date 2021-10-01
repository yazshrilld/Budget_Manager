window.onload = function() {

    //create a vaiable to store all the selected id's
    let saveLimit = document.querySelector("#saveLimit");    
    let limitSpending = document.querySelector("#limit");    
    let resetTotal = document.querySelector("#resetTotal");   

   //to retain the curent value of the limit while we refresh the project
     chrome.storage.sync.get(['limit'], function(budget) {

        limitSpending.value = parseInt(budget.limit);
    });

    //listen to the onclick on save button
    saveLimit.addEventListener("click", function() {

        //store the amount user entered in a variable
        let limitEntered = limitSpending.value;

        //check if there is a limit entered and set the value in the chrome set API
        if(limitEntered) {
            chrome.storage.sync.set({['limit']: limitEntered }, function() {
                close();
            });
        } 
    });

    //listen to the onclick on reset button
    resetTotal.addEventListener("click", function() {

        
        
        //set value of total to zero when user clicks reset
        chrome.storage.sync.set({['total']: 0 }, function() {

            //notify the user when the total has being set to zero
                //create the notification objects
                let notifyLimitToZero = {
                    type:"basic",
                    iconUrl:"icon48.png",
                    title:"Reset Notification",
                    message:"Welcome to a new day........ Spend wisely",
                    priority: 2
                }
                    chrome.notifications.create('limitNotif', notifyLimitToZero);
                    chrome.notifications.clear('limitNotif'); 
        });
    });

    
}