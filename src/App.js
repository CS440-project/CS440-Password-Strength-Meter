import PasswordMeter from "./components/PasswordMeter";

function App() {
  return (
    <div className="flex gap-x-4 md:gap-x-6 items-center mt-1">
      <div className="bg-primary text-white w-screen h-screen scrollbar-hide overflow-x-hidden overflow-y-hidden font-poppins-regular">
        <div className="flex-col justify-center">
          <h1 className="text-2xl md:text-4xl text-secondary">Password Strength Meter</h1>
          <div className="text-base md:text-xl text-secondary mt-1">CS440 G2T2</div>
          <div className="flex align-left">
            <PasswordMeter />
          </div>

        </div>
      </div>
      </div>

  );
}

export default App;
