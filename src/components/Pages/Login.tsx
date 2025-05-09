import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const Login = () => {
  return (
      <div className="h-[100vh] w-[100vw] flex items-center justify-center ">
            <Card className="w-[350px] border-2 border-black dark:bg-white dark:text-black bg-black text-white">
                  <CardHeader>
                  <CardTitle className="text-xl mx-auto">Login Here</CardTitle>
                  </CardHeader>
                  <CardContent>
                  <form>
                  <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="username">UserName</Label>
                        <Input id="username" placeholder="Enter your username" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" placeholder="Enter your password" />
                        </div>
                  </div>
                  </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                  <Button className="text-lg mx-auto">Login</Button>
                  </CardFooter>
            </Card>
      </div>
  )
}

export default Login

