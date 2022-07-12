
import React, { createContext, useEffect } from 'react'
import { initializeApp } from "firebase/app";
import { getDatabase, set, push, ref, orderByChild, onValue, query, equalTo, orderByKey, } from "firebase/database";
import { useDispatch } from 'react-redux';
import { setData, updateClients } from '../features/stateSlice';
import data from '../data/data.json';


const FirebaseContext = createContext(null);
export { FirebaseContext };



const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DB,
    projectId: "datapiper-8a3e0",
    storageBucket: "datapiper-8a3e0.appspot.com",
    messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
    appId: process.env.REACT_APP_APPID,
    measurementId: "G-FYJN5PCZVQ"
};

const FirebaseProvider = ({ children }) => {

    //TODO: Dispatch to redux store
    const dispatch = useDispatch();


    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    const database = getDatabase(app);

    let myFirebase = {
        app: app,
        database: database,
        api: {
            writeUserData,
            queryByCompany,
            queryByMatch,
            getAllData,
            postJob,
        }
    }

    function writeUserData() {
        set(ref(database, '/'), data);
    }

    function getAllData() {

        const myRef = ref(database,'Databse/');
        onValue(myRef, snapshot => {
            console.log("Retrieved:", snapshot.val())
            let vals = snapshot.val();
            // for (var key in vals) {
            //     _records = { ...vals[key] }
            // }
            // dispatch(setData(_records))
            dispatch(setData(vals));
        })
    }

    function queryByCompany(term = "PWC") {

        console.log("Term passed to firebase?", term);
        const myRef = query(ref(database, 'Databse/clients'), orderByChild('name'), equalTo(term));

        onValue(myRef, (snapshot) => {

            if (!snapshot.val().length) {
                let vals = snapshot.val();
                let _records = [];
                for (const keys in vals) {
                    _records.push(vals[keys]);
                }
                dispatch(updateClients(_records))
            } else {
                dispatch(updateClients(snapshot.val()));
            }
        })
    }

    function queryByMatch(term = "") {
        const myRef = query(ref(database, '/'), orderByKey(), equalTo(term));
        onValue(myRef, (snapshot) => {
            console.log(snapshot.val());

        })
    }

    function postJob(jobData) {
        console.log(jobData);
        let skills = {};
        for(const key of jobData.skills){
            skills[key] = true;
        }

        const myRef = ref(database, 'Databse/clients')
        //push new node
        push(myRef, {
            name: jobData.company,
            roles: [
                {
                    POC: jobData.POC,
                    Qty: 1,
                    role: jobData.role,
                    skills: skills,
                    urgency: jobData.urgency
                }
            ]
        })

    }

    useEffect(()=>{

    },[])

    return (
        <FirebaseContext.Provider value={myFirebase}>
            {children}
        </FirebaseContext.Provider>
    )

}

export default FirebaseProvider