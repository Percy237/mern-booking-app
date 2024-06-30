import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client"
import { useAppContext } from "../context/AppContext"
import { useNavigate } from "react-router"


const SignOutButton = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "Signed Out", type: "SUCCESS"})
            navigate("/sign-in")
        },
        onError: (error: Error)=>{
            showToast({message: error.message, type: "SUCCESS"})
        }
    })
    const handleClick = () => {
        mutation.mutate();
    }
  return (
    <button onClick={handleClick} className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100">Sign Out</button>
  )
}

export default SignOutButton