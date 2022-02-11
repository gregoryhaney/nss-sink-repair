import { sendRequest } from "./dataAccess.js"

export const ServiceForm = () => {
    let html = `
                <div class="field">
                    <label class="label" for="serviceDescription">Description</label>
                    <input type="text" name="serviceDescription" class="input" />
                </div>

                <div class="field">
                    <label class="label" for="serviceAddress">Address</label>
                    <input type="text" name="serviceAddress" class="input" />
                </div>

                <div class="field">
                    <label class="label" for="serviceBudget">Budget</label>
                    <input type="number" name="serviceBudget" class="input" />
                </div>

                <div class="field">
                      <label class="label" for="serviceDate">Date needed</label>
                      <input type="date" name="serviceDate" class="input" />
                </div>

                <button class="button" id="submitRequest">Submit Request</button>

    `
    return html
}


const mainContainer = document.querySelector("#container")

/*
    create an event listener that listens for the clicking
    of the 'Submit Request' button. once clicked, the data from
    each input field in the form is assigned to its respective
    variable. a JSON object is then created from the variables and
    the "sendRequest" FN is invoked to actually store the data in
    the database.json module, specifically as a new object in
    the "requests" array (once it has been converted from a JSON
    object into a string) 
*/

mainContainer.addEventListener(
    "click",
    clickEvent => {
        if (clickEvent.target.id === "submitRequest") {

        // pull the data from the user's form and put
        // each field into a variable
            const userDescription = document.querySelector("input[name='serviceDescription']").value
            const userAddress = document.querySelector("input[name='serviceAddress']").value
            const userBudget = document.querySelector("input[name='serviceBudget']").value
            const userDate = document.querySelector("input[name='serviceDate']").value

            // create an object from the above four variables
            const dataToSendToAPI = {
                description: userDescription,
                address: userAddress,
                budget: userBudget,
                needBy: userDate
            }

        // invoke the sendRequest FN to get the form data for perm storage
        // the sendRequest FN is in the dataAccess.js module
        sendRequest(dataToSendToAPI)

        }
    }
)