import { Canvas } from "./components/Canvas/Canvas"
import { Modal } from "./components/Modal/Modal"
import { Scoreboard } from "./components/Scoreboard/Scoreboard"

function App() {
  return (
    <div className="App">
      <Modal />
      <Scoreboard />
      <Canvas />
    </div>
  )
}

export default App
