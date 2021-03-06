import { Axios } from "./Axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "./setAuthJWT";

export const apiAuth = () => {
  return new Promise((resolve, reject) => {

    const token = localStorage.getItem("jwtToken");

      if(token === null){
          resolve(token)
      }
    const decoded = jwt_decode(token);
    
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("jwtToken");

      setAuthJWT(null);

      reject(null);

    } else {
      setAuthJWT(token);
        
      resolve(decoded);
    }
  });
};

export const apiRegister = registerinfo => {
  return new Promise((resolve, reject) => {
    Axios.post("/users/register", registerinfo, axiosConfig)
      .then(result => {
        const { token } = result.data;

        localStorage.setItem("jwtToken", token);

        const decoded = jwt_decode(token);

        setAuthJWT(token);

        resolve(decoded);
      })
      .catch(error => reject(error));
  });
};

export const apiLogin = logininfo => {
  return new Promise((resolve, reject) => {
    Axios.post("/users/login", logininfo, axiosConfig)
      .then(result => {
        const { token } = result.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decode(token);
        setAuthJWT(token);
        resolve(decoded);
      })
      .catch(error => reject(error));
  });
};

export const apiLogout = email => {
  return new Promise((resolve, reject) => {
    const newObj = {
      email
    };

    Axios.post("/users/logout", newObj)
      .then(result => {
        resolve(result.data);
      })
      .catch(err => reject(err));
  });
};

export const apiGetMonthEvents = (month, year) => {
  return new Promise((resolve, reject) => {
    Axios.get(`/events?yearmonth=${year}${month}`)
      .then(events => {
        events = events.data.map(event => {
          let day = event.event.dateSet.toString().slice(8, 10);
          day = day.replace(/^0/g, "");
          return (event = { ...event, dateID: day });
        });
        resolve(events);
      })
      .catch(err => reject(err));
  });
};

export const apiCreateNewEvent = (
  title,
  desc,
  year,
  month,
  day,
  time,
  user
) => {
  //TODO: set proper timezone in the near future
  const dateSet = new Date(
    year,
    month - 1,
    day,
    time[0] - 5,
    time[1]
  ).toString();

  return new Promise((resolve, reject) => {
    const newObj = {
      year,
      month,
      title,
      desc,
      dateSet,
      user
    };

    Axios.post("/events/createevent", newObj)
      .then(event => {
        resolve(event.data);
      })
      .catch(err => reject(err));
  });
};

export const apiDeleteEvent = id => {
  return new Promise((resolve, reject) => {
    Axios.delete(`/events/delete${id}`)
      .then(event => resolve(event.data))
      .catch(err => reject(err));
  });
};

export const apiEditEvent = (id, title, desc) => {
  return new Promise((resolve, reject) => {
    const newObj = {
      id,
      title,
      desc
    };

    Axios.put("/events/editevent", newObj)
      .then(result => {
        resolve(result.data);
      })
      .catch(err => reject(err));
  });
};

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};
