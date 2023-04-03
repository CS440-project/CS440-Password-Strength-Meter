import { useState } from "react";
import zxcvbn from "zxcvbn";
import Detail from "./Detail";
import Seq from "./Seq";

export default function PasswordStrength() {
    const [visibility, setVisibility] = useState("password")
    const [input, setInput] = useState("")
    const [passwordError, setPasswordErr] = useState("Password is Empty");
    const [passwordStrengthLevel, setPasswordStrengthLevel] = useState("empty")

    function toggleVisibiliy() {
        if (visibility === "password") {
            setVisibility("text")
        } else if (visibility === "text") {
            setVisibility("password")
        }
    }

    function handleChange(e) {
        setInput(e.target.value)
    }

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
        <form className="p-4 max-w-md mx-auto">
            <label className="font-medium block mb-1 mt-6 text-gray-700" for="password">
                Password
            </label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input className="hidden js-password-toggle" id="toggle" type="checkbox" onClick={() => toggleVisibiliy()} />
                    <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggle">{visibility === "password" ? "show" : "hide"}</label>
                </div>
                <input className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type={visibility} value={input} onChange={handleChange} onInput={passwordStrength}
                />

            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700 my-0.5">
                {passwordStrengthLevel === "poor" ? <div className="bg-red-600 h-2.5 rounded-full dark:bg-red-500" style={{ width: 100/3 + "%" }}></div> : ''}
                {passwordStrengthLevel === "weak"  ? <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: 100/3*2+ "%" }}></div> : ''}
                {passwordStrengthLevel === "strong"  ? <div className="bg-green-600 h-2.5 rounded-full dark:bg-green-500" style={{ width: "100%" }}></div> : ''}
            </div>
            <p> {passwordError}</p>
            <Detail 
                passwordValue={input}
                score={zxcvbn(input).score}
                guesses={zxcvbn(input).guesses}
                crack_times={zxcvbn(input).crack_times_display.offline_slow_hashing_1e4_per_second}
                suggestions={zxcvbn(input).feedback.suggestions}
                warning={zxcvbn(input).feedback.warning}
            />
            {
                zxcvbn(input).sequence.map((sequence, index)=> {
                    return (
                    <Seq key={index} sequence={sequence} />
                );
                })
            }
            
           
        </form>);

}
