import { useState } from "react";
import zxcvbn from "zxcvbn";
import Detail from "./Detail";
import Seq from "./Seq";

export default function PasswordStrength() {
    const [visibility, setVisibility] = useState("text")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordErr] = useState("Password is Empty");
    const [passwordStrengthLevel, setPasswordStrengthLevel] = useState("empty")
    const [hps, setHps] = useState(0)
    const [gpuCount, setGPUCount] = useState(1)


    function toggleVisibiliy() {
        if (visibility === "password") {
            setVisibility("text")
        } else if (visibility === "text") {
            setVisibility("password")
        }
    }

    function handleChange(e) {
        setPassword(e.target.value)
    }

    const gpuMap = { "RTX 2080": 37085000000, "RTX 3090": 69379700000, "A100s": 65437500000 }

    const passwordStrength = (evnt) => {
        const passwordValue = evnt.target.value;
        const passwordLength = passwordValue.length;
        const poorRegExp = /[a-z]/;
        const weakRegExp = /(?=.*?[0-9])/;;
        const strongRegExp = /(?=.*?[#?!@$%^&*-])/;
        const whitespaceRegExp = /^$|\s+/;
        const poorPassword = poorRegExp.test(passwordValue);
        const weakPassword = weakRegExp.test(passwordValue);
        const strongPassword = strongRegExp.test(passwordValue);
        const whiteSpace = whitespaceRegExp.test(passwordValue);

        if (passwordValue === '') {
            setPasswordErr("Password is Empty");
            setPasswordStrengthLevel("empty")
        } else {

            // to check whitespace
            if (whiteSpace) {
                setPasswordErr("Whitespaces are not allowed");
            }
            // to check poor password
            if (passwordLength <= 3 && (poorPassword || weakPassword || strongPassword)) {
                setPasswordStrengthLevel("poor");
                setPasswordErr("Password is Poor");
            }
            // to check weak password
            if (passwordLength >= 4 && poorPassword && (weakPassword || strongPassword)) {
                setPasswordStrengthLevel("weak");
                setPasswordErr("Password is Weak");

            }
            // to check strong Password
            if (passwordLength >= 6 && (poorPassword && weakPassword) && strongPassword) {
                setPasswordStrengthLevel("strong");
                setPasswordErr("Password is Strong");
            }
        }
    }





    return (
        <div className="p-4 mx-mdf flex gap-8" style={{ textAlign: "left" }}>
            <form className="p-4 max-w-md mx-auto grow-0">
                <label className="font-medium block mb-1 mt-6 text-secondary" for="password">
                    First Name
                </label>
                <input
                    className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password"
                    id="firstName"
                    type="show"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    onInput={passwordStrength}
                />
                <label className="font-medium block mb-1 mt-6 text-secondary" for="password">
                    Last Name
                </label>
                <input
                    className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password"
                    id="lastName"
                    type="show"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    onInput={passwordStrength}
                />
                <label className="font-medium block mb-1 mt-6 text-secondary" for="password">
                    Date of Birth
                </label>
                <input
                    className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password"
                    id="dateOfBirth"
                    type="show"
                    placeholder="dd/mm/yyyy"
                    value={dateOfBirth}
                    onChange={(event) => setDateOfBirth(event.target.value)}
                    onInput={passwordStrength}
                />
                <label className="font-medium block mb-1 mt-6 text-secondary" for="password">
                    Password
                </label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                        <input className="hidden js-password-toggle" id="toggle" type="checkbox" onClick={() => toggleVisibiliy()} />
                        <label className="bg-gray-100 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggle">{visibility === "password" ? "show" : "hide"}</label>
                    </div>
                    <input className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type={visibility} value={password} onChange={handleChange} onInput={passwordStrength}
                    />

                </div>
                <label className="font-medium block mb-1 mt-6 text-secondary" for="password">
                    GPU
                </label>
                <select id="gpu" class="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" onChange={(e) => {
                    setHps(gpuMap[e.target.value]);
                }}>
                    <option selected>Choose a GPU</option>
                    <option value="RTX 2080">RTX 2080</option>
                    <option value="RTX 3090">RTX 3090</option>
                    <option value="A100s">A100s</option>
                </select>
                <label className="font-medium block mb-1 mt-6 text-secondary" for="password">
                    GPU Count
                </label>
                <input
                    className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password"
                    id="lastName"
                    type="show"
                    value={gpuCount}
                    onChange={(event) => setGPUCount(event.target.value)}
                />



            </form>
            <Detail
                passwordValue={password}
                score={zxcvbn(password).score}
                guesses={zxcvbn(password).guesses}
                crack_times={zxcvbn(password).crack_times_display.offline_slow_hashing_1e4_per_second}
                suggestions={zxcvbn(password).feedback.suggestions}
                warning={zxcvbn(password).feedback.warning}
                hps={hps}
                gpuCount={gpuCount}
                className="grow-0 max-w-md shrink-0"
            />
            <div className="flex flex-row flex-wrap gap-0.5 max-w-lg">
                {
                    zxcvbn(password).sequence.map((sequence, index) => {
                        return (
                            <Seq key={index} sequence={sequence} className="gap-1 flex-grow-0 space-x-0.5" />
                        );
                    })
                }
            </div>
        </div>);

}
