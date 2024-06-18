'use server';
import { getTranslations } from "next-intl/server";
import generateCode from "../_functions/generate-code";
import { redirect, RedirectType } from "next/navigation";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import getLocale from "../_functions/get-locale";
import session from "express-session";
const emailRegex = /\w+\.\w+/ig;

export default async function StandardLoginAction(data: FormData) {

}

export async function verifyCode(data: FormData) {

}