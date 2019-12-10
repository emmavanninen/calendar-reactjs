import { Axios } from "./Axios";

export const apiGetMonthEvents = month => {
  return new Promise((resolve, reject) => {
      

    Axios.get(`/events?month=${month}`)
      .then(events => {
        console.log(`stuff from backend`, events);
        // resolve(events)
      })
      .catch(err => reject(err));
  });
};

export const apiCreateNewEvent = newEvent => {
  return new Promise((resolve, reject) => {

    const newObj = {
      event: newEvent,
    };

    Axios.post("/events/createevent", newObj, axiosConfig)
      .then(newTodo => resolve(newTodo.data))
      .catch(err => reject(err));
  });
};



const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};