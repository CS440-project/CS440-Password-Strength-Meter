import _ from "lodash"
import Entropy from "./Entropy"
import PasswordStrength from "./PasswordStrength"

const Detail = props => {
  const { passwordValue, score, guesses, crack_times, suggestions, warning, hps, gpuCount } = props
  return (
    <div className="flex flex-col gap-y-6">
      <div className=" font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-4">
        <div className="font-bold text-secondary underline">Password Entropy</div>
        <Entropy passwordValue={passwordValue} />
      </div>
      <div className="text-secondary font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-4">
        <div className="font-bold text-secondary underline">
          Character Matching
        </div>
        <div >
          Guesses:{" "}
          <span className="ml-1 text-gray-300 font-poppins-regular">
            {guesses}
          </span>
        </div>
        <div>
          Time to crack (10,000 guesses per second):{" "}
          <span className="ml-1 text-tertiary font-poppins-regular">
            {_.capitalize(crack_times)}
          </span>
        </div>
        <div className="text-secondary">
          Suggestions:{" "}
          <span className="ml-1 text-secondary font-poppins-regular">
            {suggestions.map(item => item + " ")}
          </span>
        </div>
        <div className="text-secondary">
          Warning:{" "}
          <span className="ml-1 text-secondary font-poppins-regular">
            {warning || "-"}
          </span>
        </div>
        <div className="text-secondary">
          Password Strength:
          <span className="text-gray-300 font-poppins-regular">
            {passwordValue ? <PasswordStrength score={score} /> : "-"}
          </span>
        </div>
      </div>
      <div className="text-secondary font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-4">
        <div className="font-bold text-secondary underline">
          Time to crack with computational power
        </div>
        <div >
          Guesses:{" "}
          <span className="ml-1 text-gray-300 font-poppins-regular">
            {guesses}
          </span>
        </div>
        <div>
          Time to crack with GPU:{" "}
          <span className="ml-1 text-tertiary font-poppins-regular">
            {hps===0? "-": (guesses / (hps * gpuCount)) <= 1? "Less than a second":(guesses / (hps * gpuCount)).toFixed(2)+ " seconds"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Detail
