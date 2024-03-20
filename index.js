const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please include the private app access token in your repo BUT only an access token built in a TEST ACCOUNT. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

// TODO: ROUTE 1 - Create a new app.get route for the homepage to call your custom object data. Pass this data along to the front-end and create a new pug template in the views folder.

// * Code for Route 1 goes here

// TODO: ROUTE 2 - Create a new app.get route for the form to create or update new custom object data. Send this data along in the next route.

// * Code for Route 2 goes here

// TODO: ROUTE 3 - Create a new app.post route for the custom objects form to create or update your custom object data. Once executed, redirect the user to the homepage.

// * Code for Route 3 goes here

/** 
* * This is sample code to give you a reference for how you should structure your calls. 
*/

app.get('/', async (req, res) => {
    const pet = 'https://api.hubapi.com/crm/v3/objects/2-26149395?limit=10&properties=name&properties=type&properties=leg_count&archived=false';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        console.log(data);
        res.render('pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error);
    }
});

//Pets add view
app.get('/add', async (req, res) => {
    res.render('add_pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/add', async (req, res) => {
    const add = {
        properties: {
            "name": req.body.petName,
            "type": req.body.petType,
            "leg_count": req.body.legCount,
        }
    }

    const addPets = `https://api.hubapi.com/crm/v3/objects/2-26149395`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(addPets, add, { headers } );
        const pet = 'https://api.hubapi.com/crm/v3/objects/2-26149395?limit=10&properties=name&properties=type&properties=leg_count&archived=false';
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        res.render('pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });
    } catch(err) {
        console.error(err);
    }
});

// Pets update table view
app.get('/pet-update', async (req, res) => {
    const pet = 'https://api.hubapi.com/crm/v3/objects/2-26149395?limit=10&properties=name&properties=type&properties=leg_count&archived=false';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        res.render('update_pet', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});


// Pets update view
app.get('/update-cobj', async (req, res) => {

    const id = req.query.ObjectId;
    const getPet = `https://api.hubapi.com/crm/v3/objects/2-26149395/${id}?properties=name,type,leg_count`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getPet, { headers });
        const data = response.data;

        res.render('edit_pet', {name: data.properties.name, type: data.properties.type, leg_count: data.properties.leg_count});
        
    } catch(err) {
        console.error(err);
    }
});

app.post('/update-cobj', async (req, res) => {
    
    const update = {
        properties: {
            "name": req.body.petName,
            "type": req.body.petType,
            "leg_count": req.body.legCount,
        }
    }

    const id = req.query.ObjectId;
    const updatePet = `https://api.hubapi.com/crm/v3/objects/2-26149395/${id}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updatePet, update, { headers } );
        const pet = 'https://api.hubapi.com/crm/v3/objects/2-26149395?properties=name&properties=type&properties=leg_count&archived=false';
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        res.render('pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });    
    } catch(err) {
        console.error(err);
    }

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));