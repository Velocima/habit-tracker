const devURL = 'http://localhost:3000';

async function getAllUserHabits(){
    try {
        const options = { headers: new Headers({'Authorization': localStorage.getItem('token')}) }
        const response = await fetch(`${devURL}/habits/${userId}`, options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            // require logout function from auth.js
            // logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function getUserInfo(userId){
    try {
        const options = { headers: new Headers({'Authorization': localStorage.getItem('token')}) }
        const response = await fetch(`${devURL}/users/${userId}`, options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            // require logout function from auth.js
            // logout();
        }
        return data;
    } catch (err) {
        console.warn(err);
    }
}


async function postHabit(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': localStorage.getItem('token'),
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        
        const response = await fetch(`${devURL}/habits`, options);
        const responseJson = await response.json();
        if(responseJson.err) { 
            throw Error(err) 
        } else {
            // add a new habit (require from dom_elements.js)
        }
    } catch (err) {
        console.warn(err);
    }
}

async function deleteHabit(id){
    try {
        const options = { 
            method: 'DELETE',
            headers: new Headers({'Authorization': localStorage.getItem('token')})
        }
        const response = await fetch(`${devURL}/habits/${id}`, options);
        const responseJson = await response.json();
        if(responseJson.err) { 
            throw Error(err) 
        };
    } catch (err) {
        console.warn(err);
    }
}

async function updateHabit(id, e){
    e.preventDefault();
    try {
        const options = { 
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch(`${devURL}/habits/${id}`, options);
        const responseJson = await response.json();
        if(responseJson.err) { 
            throw Error(err) 
        } else {
            // redirect to the dashboard
            console.log(responseJson)
        };
    } catch (err) {
        console.warn(err);
    }
}

async function updateUserInfo(id, e){
    e.preventDefault();
    try {
        const options = { 
            method: 'PUT',
            headers: new Headers({'Authorization': localStorage.getItem('token')}),
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const response = await fetch(`${devURL}/habits/${id}`, options);
        const responseJson = await response.json();
        if(responseJson.err) { 
            throw Error(err) 
        } else {
            // redirect to the dashboard
            console.log(responseJson)
        };
    } catch (err) {
        console.warn(err);
    }
}



