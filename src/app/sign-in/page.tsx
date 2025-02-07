"use client";
import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("*/checkout"); // Redirect to checkout after sign-in
    }
  }, [isSignedIn, isLoaded, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
        <SignIn path="/sign-in(.*)" />
      </div>
    </div>
  );
};

export default SignInPage;
// "use client";
// import { SignIn } from "@clerk/nextjs";
// import { useAuth } from "@clerk/nextjs";
// import { useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// const SignInPage = () => {
//   const { isSignedIn, isLoaded } = useAuth();
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect_url") || "/"; // Default to homepage

//   useEffect(() => {
//     if (isLoaded && isSignedIn) {
//       router.push(redirectUrl); // Redirect to intended page
//     }
//   }, [isSignedIn, isLoaded, router, redirectUrl]);

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-md p-6 rounded-lg">
//         <h2 className="text-2xl font-semibold text-center mb-4">Sign In</h2>
//         <SignIn redirectUrl={redirectUrl} />
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
