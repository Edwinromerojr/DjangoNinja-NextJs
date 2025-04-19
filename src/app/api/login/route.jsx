"use server";
import { getRefreshToken, getToken, setRefreshToken, setToken } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8000/api/token/pair";

export async function POST(request) {
    const myAuthToken = await getToken();
    const myRefreshToken = await getRefreshToken();
    console.log(myAuthToken, myRefreshToken)

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
    }

    // const authToken = cookies().get("auth-token");

  return NextResponse.json({"hello": "world"}, { status: 200 });
}
