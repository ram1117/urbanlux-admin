import SigninForm from "@/components/auth/SigninForm";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

const SigninPage = () => {
  return (
    <Card className="w-11/12 lg:w-3/5 max-w-[450px] flex flex-col items-center border-dark bg-light rounded-none my-20">
      <CardHeader>
        <div className="flex uppercase text-lg lg:text-2xl">
          <h2 className="border p-1 text-dark bg-light">Urban</h2>
          <h2 className="border-r border-y p-1 bg-dark text-light">Trend</h2>
        </div>
      </CardHeader>
      <CardContent className="w-full p-4">
        <SigninForm />
      </CardContent>
      <CardFooter className="flex flex-col items-start w-full">
        <p className="my-2 italic underline">
          <Link href={"/auth/forgotpassword"}>Forgot password?</Link>
        </p>
        <p>
          Don&apos;t have an account?{" "}
          <span className="font-semibold underline">
            <Link href={"/auth/signup"}>Sign Up</Link>
          </span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SigninPage;
