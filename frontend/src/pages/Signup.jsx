import { useState } from "react"
import { useSignup } from "../hooks/useSignup"


const Signup = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { signup, error, isLoading } = useSignup()


    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)

    }

    return (
        <form className="signup bg-base-300" onSubmit={handleSubmit}>
            <h3 className="text-center mb-10 text-2xl text-white">Sign up</h3>
            <label>Email</label>
            <input
                className="bg-base-100"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Password</label>

            <input
                className="bg-base-100"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <button className="w-full" disabled={isLoading}>Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )

}

export default Signup