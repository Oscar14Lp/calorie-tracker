
import { useEffect, useMemo, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducers/activityReducer"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"


function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canRestartApp = () => useMemo(() => state.activities.length > 0, [state.activities])


  return (
    <>
      <header className="bg-[#FF5F00] py-3">
        <div className=" max-w-4xl mx-auto flex justify-between items-center">
          <h1 className=" text-center text-lg font-bold uppercase text-white " >
            Contador de Calorias
          </h1>

          <button
            className=" bg-indigo-600 hover:bg-indigo-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm disabled:opacity-10 disabled:pointer-events-none"
            disabled={!canRestartApp()}
            onClick={() => dispatch({ type: 'restart-app' })}
          >
            Reiniciar App
          </button>

        </div>
      </header>

      <section className=" bg-[#FF9F66] py-20 px-5">
        <div className=" max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-[#002379] py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            activities={state.activities}
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default App
