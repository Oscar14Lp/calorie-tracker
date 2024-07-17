import { Activity } from "../types"
import { categories } from "../data/categories"
import { useMemo, Dispatch } from "react"
import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { ActivityActions } from "../reducers/activityReducer"

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
}

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const categoryName = useMemo(() =>
        (category: Activity['category']) => categories.map(cat => cat.id === category ? cat.name : '')
        , [activities])


    return (
        <>
            <h2 className=" text-4xl font-bold text-[#002379] text-center">Comida y Actividades</h2>

            {activities.length === 0 ? <p className=" text-center my-5">No tienes actividades. </p> :

                activities.map(activity => (
                    <div key={activity.id} className=" px-5 py-5 bg-white mt-5 flex justify-between shadow">

                        <div className=" space-y-2 relative">
                            <p className={` absolute -top-8 -left-8 px-10 py-2 text-white uppercase  font-bold ${activity.category === 1 ? 'bg-[#FF5F00]' : 'bg-[#002379]'}`}>
                                {categoryName(+activity.category)}
                            </p>
                            <p className=" text-2xl font-bold pt-5">
                                {activity.name}
                            </p>
                            <p className={`font-black text-4xl  ${activity.category === 1 ? 'text-[#FF5F00]' : 'text-[#002379]'} `}>
                                {activity.calories} {''}
                                <span>Calorias</span>
                            </p>

                        </div>


                        <div className="flex gap-5 items-center">
                            <button
                                onClick={() => dispatch({ type: 'set-activeId', payload: { id: activity.id } })}
                            >
                                <PencilSquareIcon
                                    className="h-8 w-8 text-indigo-600"
                                />
                            </button>
                            <button
                                onClick={() => dispatch({ type: 'delete-activity', payload: { id: activity.id } })}
                            >
                                <XCircleIcon
                                    className="h-8 w-8 text-red-500"
                                />
                            </button>
                        </div>
                    </div>


                ))
            }
        </>
    )
}
