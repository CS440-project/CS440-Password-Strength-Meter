import _ from "lodash"
import Entropy from "./Entropy"
import PasswordStrength from "./PasswordStrength"

const calculateCharacterPools = passwordValue => {
  const pools = new Array(4).fill(0)
  for (const character of passwordValue) {
    if (character >= "a" && character <= "z") {
      pools[0] = 1
    } else if (character >= "A" && character <= "Z") {
      pools[1] = 1
    } else if (character >= "0" && character <= "9") {
      pools[2] = 1
    } else {
      pools[3] = 1
    }
  }

  let sum = 0
  if (pools[0] === 1) {
    sum += 26
  }
  if (pools[1] === 1) {
    sum += 26
  }
  if (pools[2] === 1) {
    sum += 10
  }
  if (pools[3] === 1) {
    sum += 32
  }

  return sum
}

const calculateGuesses = passwordValue => {
  const len = passwordValue.length
  const characterPools = calculateCharacterPools(passwordValue)
  return Math.pow(characterPools, len)
}

const calculateEntropy = passwordValue => {
  const guesses = calculateGuesses(passwordValue)

  return Math.log(guesses) / Math.log(2)
}

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
            {calculateGuesses(passwordValue)}
          </span>
        </div>
        <div>
          Time to crack with GPU:{" "}
          <span className="ml-1 text-tertiary font-poppins-regular">
            {hps===0? "-": (calculateGuesses(passwordValue) / (hps * gpuCount)) <= 1? "Less than a second":(calculateGuesses(passwordValue) / (hps * gpuCount)).toFixed(2)+ " seconds"}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Detail
