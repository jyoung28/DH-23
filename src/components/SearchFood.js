import React, {useContext} from "react";
import axios from "axios";
import {db} from '../firebaseSetup/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
// need to pass in user whenever using this

export default async function runQuery(query, user) {
    const apiKey = 'Jw89erN2gfT0GGfENQqr4A==l45cwHcQSZs1kD77';
    try {
        const response = await axios.get('https://api.calorieninjas.com/v1/nutrition', {
            params: { query },
            headers: { 'X-Api-Key': apiKey },
            responseType: 'json'
        })
        console.log(response.data);
        if (response.data.items) {
            let total = 0;
            for (let i  = 0; i < response.data.items.length; i++) {
                total += response.data.items[i].calories;
            }
            console.log(total);
            const user_data = await getDoc(doc(db, "users", user));
            let totalT = total;
            if (user_data.data() && user_data.data().totalToday ) {
                totalT += user_data.data().totalToday 
            }

            await setDoc(doc(db, "users", user), {
                totalToday:  totalT,
                goal: user_data.data().goal,
                gain: user_data.data().gain,

            });
            console.log(total);
            return total;
        }
        return null;
    } catch (error) {
        console.error('Error:', error);
    }
}
