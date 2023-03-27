import PasswordMeter from "./components/PasswordMeter";

function App() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex-col justify-center">
        <h1 className="text-2xl font-bold text-center">Password Strength Meter</h1>
        <PasswordMeter className="justify-center" />
      </div>
    </div>
  );
}

export default App;
