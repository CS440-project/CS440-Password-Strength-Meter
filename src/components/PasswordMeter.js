import { useState } from "react";


export default function PasswordMeter() {
    const [visibility, setVisibility] = useState("password")

    function toggleVisibiliy() {
        if (visibility === "password") {
            setVisibility("text")
        } else if (visibility === "text") {
            setVisibility("password")
        }
    }

    return (
        <form class="p-4 max-w-md mx-auto">
            <label class="font-medium block mb-1 mt-6 text-gray-700" for="password">
                Password
            </label>
            <div class="relative w-full">
                <div class="absolute inset-y-0 right-0 flex items-center px-2">
                    <input class="hidden js-password-toggle" id="toggle" type="checkbox" onClick={()=>toggleVisibiliy()} />
                    <label class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle">{visibility === "password" ? "show" : "hide"}</label>
                </div>
                <input class="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" id="password" type={visibility} autocomplete="off"
                />
            </div>
        </form>);

}
