import { SinkRepair } from "./SinkRepair.js"
import { fetchRequests } from "./dataAccess.js"

// need to fetch the data from the API and store it
// in application state before converting the
// data structures to HTML representations.

const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests().then(
        () => {
    mainContainer.innerHTML = SinkRepair()
        }
    )
}           

render()

/*
    set an event listener to listen for "stateChanged"
    from the 'dataAccess.js' module - in that module, 
    once a new service request is entered and
    the POST operation is complete, the "stateChanged"
    custom event is dispatched. here, the listener listens
    for that dispatch so it can make a new GET from the 
    'database.json' module and render the most current data
    to the user.

    this listener also listens for the 'stateChanged' 
    broadcast dispatched when an object is deleted from
    the "requests" array in the 'database.json' module.
    The DELETE operation is handled in the 'dataAccess.js' module.
*/

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
            render()
    }
)