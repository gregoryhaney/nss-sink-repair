import { getRequests, deleteRequest } from "./dataAccess.js"

/*
    this FN is for the DELETE button rendered at the 
    end of each service request in the UI. its purpose is
    to allow for deletion of the associated service request
*/

const convertRequests = (request) => {
    return `
    <li>
    ${request.description}
    <button class="request__delete" id="request--${request.id}">Delete</button>
    </li>    
    `
}

/*
        define the FN that will be passed to the .map() method
        this FN will convert each service request object into 
        HTML representation
        each request object will be an LI
*/

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequests).join("")
            }
        </ul>
    `

    return html
}


/*
    this event listener responds to a click of the 'Delete' 
    button adjacent to a service request in the UI.
*/

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
        if (click.target.id.startsWith("request--")) {
            const [,requestId] = click.target.id.split("--")
            deleteRequest(parseInt(requestId))
        }
    })
