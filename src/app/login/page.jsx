"use client";
// -> url -> /login
// import { cookies } from 'next/headers'

// const LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";
const LOGIN_URL = "/api/login/";

export default function Page() {
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(event, event.target);

    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(LOGIN_URL, requestOptions);
    const rData = await response.json();
    console.log(rData);
    if (response.ok) {
      console.log("Login successful");
    }
  }

  return (
    <div className="h-[95vh]">
      <div className="max-w-md mx-auto py-5">
        <h1>Login Here</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            name="username"
            placeholder="Your Username"
          />
          <input
            type="password"
            required
            name="password"
            placeholder="Your Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
