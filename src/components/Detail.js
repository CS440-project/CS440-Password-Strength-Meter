import _ from "lodash"
import Entropy from "./Entropy"
import PasswordStrength from "./PasswordStrength"

const Detail = props => {
  const { passwordValue, score, guesses, crack_times, suggestions, warning } = props
  return (
    <div className="flex flex-col gap-y-6">
      <div className="text-white font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-4">
        <div className="font-poppins-bold text-secondary">Password Entropy</div>
        <Entropy passwordValue={passwordValue} />
      </div>
      <div className="text-white font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-4">
        <div className="font-poppins-bold text-secondary">
          Character Matching
        </div>
        <div>
          Guesses:{" "}
          <span className="ml-1 text-gray-300 font-poppins-regular">
            {guesses}
          </span>
        </div>
        <div>
          Time to crack (10,000 guesses per second):{" "}
          <span className="ml-1 text-gray-300 font-poppins-regular">
            {_.capitalize(crack_times)}
          </span>
        </div>
        <div>
          Suggestions:{" "}
          <span className="ml-1 text-gray-300 font-poppins-regular">
            {suggestions.map(item => item + " ")}
          </span>
        </div>
        <div>
          Warning:{" "}
          <span className="ml-1 text-gray-300 font-poppins-regular">
            {warning || "-"}
          </span>
        </div>
        <div>
          Password Strength:
          <span className="text-gray-300 font-poppins-regular">
            {passwordValue ? <PasswordStrength score={score} /> : "-"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Detail
