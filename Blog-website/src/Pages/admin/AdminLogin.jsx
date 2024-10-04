import { useContext, useState } from "react";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast"
import {
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Typography,
} from "@material-tailwind/react";
import MyContext from "../../Context/data/MyContext";
import {auth} from "../../Firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
export function AdminLogin() {
    const context = useContext(MyContext);
    const { mode } = context;
    const navigate=useNavigate();

    const [email,setEmail]=useState("");
    const [password, setPassword] = useState("");
    const login=async()=>{
        if(!email && !password){
            return toast.error("All fields are required!");
        }
        try{
            const result =await signInWithEmailAndPassword(auth,email,password);
            toast.success("Login Successfully");
            localStorage.setItem("admin",JSON.stringify(result));
            navigate("/dashboard");
        }
        catch(error){console.log(error)
            toast.error("login failed")

        }
    }

    return (
        <div className="flex justify-center items-center h-screen">

            {/* Card  */}
            <Card
                className="w-full max-w-[24rem]"
                style={{
                    background: mode === 'dark'
                        ? 'rgb(30, 41, 59)'
                        : 'rgb(226, 232, 240)'
                }}
            >
                {/* CardHeader */}
                <CardHeader
                    color="blue"
                    floated={false}
                    shadow={false}
                    className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
                    style={{
                        background: mode === 'dark'
                            ? 'rgb(226, 232, 240)'
                            : 'rgb(30, 41, 59)'
                    }}
                >
                    <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
                        <div className=" flex justify-center">
                            {/* Image  */}
                            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20"
                            />
                        </div>
                    </div>

                    {/* Top Haeding  */}
                    <Typography variant="h4" style={{
                        color: mode === 'dark'
                            ? 'rgb(30, 41, 59)'
                            : 'rgb(226, 232, 240)'
                    }}>
                        Admin Login
                    </Typography>
                </CardHeader>

                {/* CardBody */}
                <CardBody>
                    <form className=" flex flex-col gap-4">
                        {/* First Input  */}
                        <div>
                            <Input
                                type="email"
                                label="Email"
                                name="email"
                                value={email}
                                onChange={(event)=>{setEmail(event.target.value)}}
                            />
                        </div>
                        {/* Second Input  */}
                        <div>
                            <Input
                                type="password"
                                label="Password"
                                value={password}
                                onChange={(event)=>{setPassword(event.target.value)}}
                            />
                        </div>
                        {/* Login Button  */}
                        <Button
                        onClick={login}
                            style={{
                                background: mode === 'dark'
                                    ? 'rgb(226, 232, 240)'
                                    : 'rgb(30, 41, 59)',
                                color: mode === 'dark'
                                    ? 'rgb(30, 41, 59)'
                                    : 'rgb(226, 232, 240)'
                            }}>
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>


    );
} 