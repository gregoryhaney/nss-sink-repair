// create an empty array to hold the external data
const applicationState = {
        requests: []            // an empty array by design
}

const API = "http://localhost:8088"

const mainContainer = document.querySelector("#container")


export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}


// define and export a FN that returns a copy of the
// requests state

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}


/*
    this FN is invoked when the user clicks the "Submit Request"
    button on the form. 
    it takes the transient state of the data (from the unsaved form)
    and converts it to permanent state by storing it in the
    database.json module, specifically in the "requests" array.
    this is done through an API call using the HTTP "POST" method, 
    specifying that the header content type will be "application/json".
    also require the .stringify method in the body to convert the json
    value into a string
*/

export const sendRequest = (userServiceRequest) => {
        const fetchOptions = {
            method: "POST",
            headers: {
                    "Content-Type": "application/json"
                    },
            body: JSON.stringify(userServiceRequest)
            }

/*
        create custom event to be dispatched after the 
        POST operation operation executes. this causes the list
        of service requests to refresh showing the most
        current data to the user
*/

        return fetch(`${API}/requests`, fetchOptions)
            .then(response => response.json())
            .then(() => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            })
}


/*
        this FN's role is to handle the HTTP DELETE operation
        for removing a service request from the "requests" array
        in the 'database.json' module.
        DELETE's must uniquely identify the object to remove, which
        is done using the PK of the object (the 'id' in this case).
        this FN requires the object's id to be passed to it as an
        argument. additionally, once the DELETE operation is complete,
        a "stateChanged" custom event is dispatched. it is being
        listened for my the event listener is the 'main.js' module.
        when it hears this "stateChanged" broadcast, it will do
        a new fetch to GET the most current data from 'database.json'
        and render it to the user.
*/

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
    .then(
        () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}
