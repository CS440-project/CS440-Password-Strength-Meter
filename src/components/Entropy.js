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

const calculateScore = passwordValue => {
  const guesses = calculateGuesses(passwordValue)

  if (guesses < Math.pow(2, 25)) {
    return 0
  } else if (guesses < Math.pow(2, 50)) {
    return 1
  } else if (guesses < Math.pow(2, 75)) {
    return 2
  } else if (guesses < Math.pow(2, 100)) {
    return 3
  }
  return 4
}

const Entropy = props => {
  const { passwordValue } = props
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-secondary">
        Guesses:{" "}
        <span className="ml-1 text-gray-300">
          {calculateCharacterPools(passwordValue)}
          <sup>{passwordValue.length}</sup> = {calculateGuesses(passwordValue)}
        </span>
      </div>
      <div>
        <span className="font-poppins-regular text-gray-300">
          E = log<sub>2</sub>
          {calculateCharacterPools(passwordValue)}
          <sup>{passwordValue.length}</sup> = {calculateEntropy(passwordValue)}
        </span>
      </div>
      <div className="text-secondary">
        Password Strength:
        <span className="text-gray-300 font-poppins-regular">
          {passwordValue ? <PasswordStrength score={calculateScore(passwordValue)} /> : "-"}
        </span>
      </div>
    </div>
  )
}

export default Entropy
