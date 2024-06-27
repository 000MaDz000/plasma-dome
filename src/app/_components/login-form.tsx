'use client';

import { Button, Paper, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ValidateLoginStep, ValidateType } from "../_actions/standard-login";
import { useRouter } from "next/navigation";

const typesHashmap: { [key: string | number]: string | number } = {
    1: "mobile",
    2: "code",
    3: "name",
    4: "password",
    5: "confirm password",
}

for (let key in typesHashmap) {
    typesHashmap[typesHashmap[key]] = key;
}

export default function LoginForm() {
    const [step, setStep] = useState(1);
    const t = useTranslations("Login");
    const [data, setData] = useState("");
    const [pending, setIsPending] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const router = useRouter();

    const onInputChange = (value: string) => {
        setData(value);
        if (errMessage) {
            setErrMessage("");
        }
    }



    useEffect(() => {
        if (!pending) { return };
        let type = typesHashmap[step];


        (async () => {
            const res = await ValidateLoginStep(type as any, data);
            if (res?.errorMessage) {
                setErrMessage(res.errorMessage);
                return;
            }

            if (res.nextStep) {
                setStep(typesHashmap[res.nextStep] as number)
                return;
            }

            if (res.success && !res.nextStep) {
                router.replace("/store");
            }
            else if (res.success && res.nextStep == "dashboard") {
                router.replace("/dashboard");
            }

            console.log(res);


        })().then(() => {
            setIsPending(false)
        });

    }, [pending]);


    return (
        <div className={`flex gap-2 justify-center items-center w-screen`}>

            <Paper className={`p-7 w-3/4 md:w-1/2`}>

                <div className="[&>div]:flex [&>div]:flex-col [&>div]:gap-5 flex flex-col gap-4">
                    <>

                        {step == 1 && (
                            <div>
                                <Typography variant="h6">{t("enter mobile")}</Typography>
                                <TextField name="mobile" type="text" fullWidth placeholder={t("mobile")} onChange={(e) => onInputChange(e.target.value)} />
                            </div>
                        )}

                        {step == 2 && (
                            <div>
                                <Typography variant="h6">{t("enter code")}</Typography>
                                <TextField name="mobile" type="text" fullWidth placeholder={t("code")} onChange={(e) => onInputChange(e.target.value)} />
                            </div>
                        )}

                        {step == 3 && (
                            <div>
                                <Typography variant="h6">{t("enter name")}</Typography>
                                <TextField name="name" fullWidth placeholder={t("name")} onChange={(e) => onInputChange(e.target.value)} />
                            </div>
                        )}


                        {step == 4 && (
                            <div>
                                <Typography variant="h6">{t("enter password")}</Typography>
                                <TextField name="password" type="password" fullWidth placeholder={t("password")} onChange={(e) => onInputChange(e.target.value)} />
                            </div>
                        )}
                        {step == 5 && (
                            <div>
                                <Typography variant="h6">{t("enter confirm password")}</Typography>
                                <TextField name="confirm-password" type="password" fullWidth placeholder={t("confirm password")} onChange={(e) => onInputChange(e.target.value)} />
                            </div>
                        )}

                        {errMessage && (
                            <Typography color="error">
                                {errMessage}
                            </Typography>
                        )}


                        <Button onClick={() => setIsPending(true)}>{t("next")}</Button>

                    </>

                </div>



            </Paper>
        </div>
    )
}