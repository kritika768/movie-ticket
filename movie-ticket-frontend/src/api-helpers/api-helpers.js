import axios from "axios";
export const getAllMovies = async () => {
  const res = await axios
    .get("http://localhost:8000/movie")
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

// export const userAuth = async (data, signup) => {
//   const res = await axios
//     .post(`http://localhost:8000/user/${signup ? "signup" : "login"}`, {
//       name: signup ? data.name : "",
//       email: data.email,
//       password: data.password,
//     })
//     .catch((err) => console.log(err));

//   if (res.status !== 200 && res.status !== 201) {
//     console.log("Unexpected Error Occured");
//   }
//   const resData = await res.data;
//   return resData;
// };
export const userAuth = async (data, signup) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/user/${signup ? "signup" : "login"}`,
      {
        name: signup ? data.name : "",
        email: data.email,
        password: data.password,
      }
    );

    // Handle different status codes here, if needed
    if (res.status === 200 || res.status === 201) {
      return res.data;
    } else {
      // Handle other status codes
      console.log("Unexpected Error Occurred");
      throw new Error("Unexpected Error Occurred");
    }
  } catch (err) {
    console.error(err);
    throw err; // Rethrow the error or return a specific value
  }
};

export const adminAuth = async (data) => {
  const res = await axios
    .post("http://localhost:8000/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios
    .get(`http://localhost:8000/movie/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking = async (data) => {
  const res = await axios
    .post("http://localhost:8000/bookings", {
      movie: data.movie,
      seatNumber: data.seatNumber,
      date: data.date,
      user: localStorage.getItem("userId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getUserBooking = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`http://localhost:8000/user/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteBooking = async (id) => {
  const res = await axios
    .delete(`http://localhost:8000/bookings/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unepxected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getUserDetails = async () => {
  const id = localStorage.getItem("userId");
  const res = await axios
    .get(`http://localhost:8000/user/${id}`)
    .catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addMovie = async (data) => {
  const res = await axios
    .post(
      "http://localhost:8000/movie",
      {
        title: data.title,
        description: data.description,
        releaseDate: data.releaseDate,
        posterUrl: data.posterUrl,
        fetaured: data.fetaured,
        actors: data.actors,
        admin: localStorage.getItem("adminId"),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getAdminById = async () => {
  const adminId = localStorage.getItem("adminId");
  const res = await axios
    .get(`http://localhost:8000/admin/${adminId}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
