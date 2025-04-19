"use server";
import { setRefreshToken, setToken } from "@/app/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";

export async function POST(request) {
    const requestData = await request.json();
    const jsonData = JSON.stringify(requestData);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();
    if (response.ok) {
      console.log("Login successful");
      const {access, refresh} = responseData;
      await setToken(access);
      await setRefreshToken(refresh);
      return NextResponse.json({"loggedIn": true}, { status: 200 });
    }

  return NextResponse.json({"loggedIn": false, ...responseData}, { status: 401 });
}
