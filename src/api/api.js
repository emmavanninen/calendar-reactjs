import { Axios } from "./Axios";
import jwt_decode from "jwt-decode";
import setAuthJWT from "./setAuthJWT";

export const apiAuth = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("jwtToken");
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000;

    // console.log(`decoded`, decoded);
    

    if (decoded.exp < currentTime) {
      localStorage.removeItem("jwtToken");

      setAuthJWT(null);

      reject(null);
    } else {
      setAuthJWT(token);

      const user = {
        id: decoded.id,
        name: decoded.email
      };

      resolve(user);
    }
  });
};

export const apiRegister = registerinfo => {
//   console.log(registerinfo);

  return new Promise((resolve, reject) => {
    Axios.post("/users/register", registerinfo, axiosConfig)
      .then(result => {
        // console.log(`from backend to api.js`, result);
        const { token } = result.data;
        
        localStorage.setItem("jwtToken", token);

        const decoded = jwt_decode(token);

        setAuthJWT(token);

        resolve(decoded);
      })
      .catch(error => reject(error.response.data.message));
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
      .catch(error => reject(error.response.data.message));
  });
};

export const apiLogout = logoutinfo => {
    return new Promise((resolve, reject) => {
        Axios.post("/users/logout", logoutinfo, axiosConfig)
          .then(result => {})
          .catch(err => reject(err));
    })
}

export const apiGetMonthEvents = (month, year) => {
//   console.log(month);
//   console.log(year);

  return new Promise((resolve, reject) => {
    Axios.get(`/events?yearmonth=${year}${month}`)
      .then(events => {
        events = events.data.map(event => {
          let day = event.event.date.slice(8, 10);
          day = day.replace(/0/g, "");
          return (event = { ...event, dateID: day });
        });
        resolve(events);
      })
      .catch(err => reject(err));
  });
};

export const apiCreateNewEvent = (title, desc, date) => {
  return new Promise((resolve, reject) => {
    const newObj = {
      title,
      desc,
      date
    };

    Axios.post("/events/createevent", newObj)
      .then(event => resolve(event.data))
      .catch(err => reject(err));
  });
};

export const apiEditEvent = (id, title, desc) =>{
    
    

    return new Promise((resolve, reject) => {
        const newObj = {
            id,
            title,
            desc
        };

        Axios.put("/events/editevent", newObj)
            .then(result => {
                resolve(result.data)
            })
            .catch(err => reject(err));
    });
    
}

const axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  }
};
