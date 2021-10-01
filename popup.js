window.onload = function() {

    //create a vaiable to store all the selected id's
    let totalSpent = document.querySelector("#total");    
    let limitSpending = document.querySelector("#limit");    
    let amount = document.querySelector("#amount");    
    let spendAmount = document.querySelector("#spendAmount");   

    //to retain the curent value of the total and limit while we refresh the project
    chrome.storage.sync.get(['total', 'limit'], function(budget) {

        let newTotal = 0;
        let newLimit = 0;
        newTotal = totalSpent.innerText = parseInt(budget.total)
        newLimit = limitSpending.innerText = parseInt(budget.limit)
        // totalSpent.innerText = parseInt(budget.totalSpent)
        // console.log(newTotal);
    });


    //check if anything is being clicked
    spendAmount.addEventListener("click", function() {

        //use the chrome API to get the total
        chrome.storage.sync.get(['total', 'limit'], function(budget) {

            //initiate a new budget to zero
            let newTotal = 0;

            //check if the total for this budget exist, then increment the total with the new amount
            if(budget.total) {
                newTotal += parseInt(budget.total);
            }

            //store the amount user entered in a variable
            let amountEntered = amount.value;

            //check if the user entered an amount and set the newtotal to that amount
            if(amountEntered) {
                newTotal += parseInt(amountEntered);
            }

            //set and send the newTotal back to the chrome storage and give it a value of the amountEntered, use this to compare the budget and limit
            chrome.storage.sync.set({['total']: newTotal }, function() {
                if(amountEntered && newTotal >= budget.limit) {
                    //create the notification objects
                    let notifyLimit = {
                        type:"basic",
                        iconUrl:"icon48.png",
                        title:"Limit Notification",
                        message:"Ooops!! you have reached your spending Limit for the day........",
                        priority: 2
                    }
                    chrome.notifications.create('limitNotif', notifyLimit);
                }
            });

            //update the total with the newTotal
            let userTotal = newTotal;

            //store the result of the newTotal into the total span tag
            totalSpent.innerText = userTotal;

            //set the input amount field to the value entered after a sucesful check
            // if(amountEntered) {
            //     amount.value = amountEntered;
            // }
            //set the input amount field to empty entered after a sucesful check
            if(amountEntered) {
                amount.value = "";
            }
        });
        

    });

}