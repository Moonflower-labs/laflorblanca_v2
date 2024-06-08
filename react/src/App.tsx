/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import ErrorPage from "./routes/Error";
import Homepage, { homeAction, homeLoader } from "./components/Homepage";
import Login, { loginLoader, loginAction } from "./routes/auth/login";
import Register from "./routes/auth/register";
import { registerLoader, registerAction } from "./routes/auth/register";
import Help from "./routes/help";
import authProvider from "./utils/auth";
import { commentAction } from "./routes/comments";
import Checkout from "./routes/payments/checkout";
import Success, { successLoader } from "./routes/payments/success";
import Subscribe from "./routes/payments/subscribe";
import ShoppingCart from "./components/ui/ShoppingCart";
// import handleAccessRestriction from "./config/permissions";
import protectedRouteLoader from "./config/protectedRouteLoader";
import { loadStripe } from "@stripe/stripe-js";
import ConfirmReset, {
  confirmResetAction,
} from "./routes/auth/reset-confirmation";
import PaymentsLayout from "./components/layouts/PaymentsLayout";
import { Personality, personalityAction, personalityLoader } from "./routes/members/personality";
import { BasicDetail, basicDetailAction, basicDetailLoader } from "./routes/members/personality/detail";
import { SoulDetail, soulDetailAction, soulDetailLoader } from "./routes/members/soul/detail";
import { Soul, soulLoader } from "./routes/members/soul";
import { Spirit, spiritLoader } from "./routes/members/spirit";
import { SpiritDetail, spiritDetailAction, spiritDetailLoader } from "./routes/members/spirit/detail";


const routes = [
  {
    id: "root",
    path: "/",
    async loader() {
      const stripePromise = loadStripe("pk_test_51LIRtEAEZk4zaxmw2ngsEkzDCYygcLkU5uL4m2ba01aQ6zXkWFXboTVdNH71GBZzvHNmiRU13qtQyjjCvTzVizlX00yXeplNgV");

      return { user: await authProvider.checkAuthentication(), stripePromise };
    },
 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Homepage />,
        action: homeAction,

      },
      {
        async lazy() {
          const { MembersLayout } = await import("./components/layouts/MembersLayout");
          return { Component: MembersLayout}
        },
        errorElement: <ErrorPage />,
        loader: protectedRouteLoader,
        children: [
          {
            async loader() {
              // if (!(await handleAccessRestriction("Personalidad"))) {
              //   return redirect("/#plans");
              // }
              return null;
           
            },
            path: "personality",
            children: [
              {
                index: true,
                loader: personalityLoader,
                action: personalityAction,
                element: <Personality />,
              },
              {
                path: "post/:id",
                loader: basicDetailLoader,
                action: basicDetailAction,
                element: <BasicDetail />,
              },
            ],
          },
          {
            loader: async () => {
              // Check user permissions
              // if (!(await handleAccessRestriction("Alma"))) {
              //   return redirect("/#plans");
              // }
              return null;
            },
            path: "soul",
            children: [
              {
                index: true,
                loader: soulLoader,
                element: <Soul />,
              },
              {
                path: "video/:id",
                loader: soulDetailLoader,
                action: soulDetailAction,
                element: <SoulDetail />,
              },
            ],
          },
          {
            loader: async () => {
              // Check user permissions
              // if (!(await handleAccessRestriction("Espíritu"))) {
              //   return redirect("/#plans");
              // }
              return null;
            },

            path: "spirit",
            children: [
              {
                index: true,
                loader: spiritLoader,
                element: <Spirit />
              },
              {
                path: "video/:id",
                loader: spiritDetailLoader,
                action: spiritDetailAction,
                element: <SpiritDetail />
              },
            ],
          },
        ],
      },
      {
        path: "questions",
        async lazy() {
          const { QuestionLayout } = await import("./components/layouts/QuestionLayout");
          return { Component: QuestionLayout}
        },
        errorElement: <ErrorPage />,
        loader: protectedRouteLoader,
        children: [
          {
            loader: async () => {
              // Check user permissions
              // if (!(await handleAccessRestriction("Personalidad"))) {
              //   return redirect("/#plans");
              // }
              return null;
            },
            path: "basic",
            children: [
              {
                index: true,
                async lazy() {
                  const { basicLoader, basicAction, BasicQuestion  } = await import("./routes/questions/basic");
                  return {
                    loader: basicLoader,
                    action: basicAction,
                    Component: BasicQuestion,
                  }
                },
              },
            ],
          },
          {
            loader: async () => {
              // Check user permissions
              // if (!(await handleAccessRestriction("Alma"))) {
              //   return redirect("/#plans");
              // }
              return null;
            },
            path: "tarot",
            children: [
              {
                index: true,
                async lazy(){
                  const { tarotLoader, tarotAction, Tarot } = 
                    await import("./routes/questions/tarot")
                  
                  return {
                    loader: tarotLoader,
                    action: tarotAction,
                    Component: Tarot,
                  }
                },
              },
            ],
          },
          {
            loader: async () => {
              // Check user permissions
              // if (!(await handleAccessRestriction("Espíritu"))) {
              //   return redirect("/#plans");
              // }
              return null;
            },
            path: "live",
            children: [
              {
                index: true,
                async lazy() {
                  const { liveLoader, liveAction, Live  } = await import("./routes/questions/live");
                  return {
                    loader: liveLoader,
                    action: liveAction,
                    Component: Live,
                  }
                },
              },
            ],
          },
        ],
      },
      {
        path: "user-profile",
        async lazy() {
          const { userProfileLoader, userProfileAction } =
            await import("./routes/userProfile/profile")
          const { UserProfileLayout } = await import("./components/layouts/UserProfileLayout")

          return {
            loader: userProfileLoader,
            action: userProfileAction,
            Component: UserProfileLayout,
          }
        },
        children: [
          {
            index: true,
            async lazy() {
              const { userProfileLoader, userProfileAction, UserProfile } =
                await import("./routes/userProfile/profile")
    
              return {
                loader: userProfileLoader,
                action: userProfileAction,
                Component: UserProfile,
              }
            },
          },
          {
            path: "subscription",
            async lazy() {
              const { userSubscriptionLoader, Subscription } =
                await import("./routes/userProfile/subscription")
              return {
                loader: userSubscriptionLoader,
                Component: Subscription,
              }
            },
          },
          {
            path: "favorites",
            async lazy() {
              const { userFavoriteLoader, Favorites } =
                await import("./routes/userProfile/favorites")
              return {
                loader: userFavoriteLoader,
                Component: Favorites,
              }
            },
          },
        ],
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "subscribe",
        element: <Subscribe />,
      },
      { 
        element: <PaymentsLayout />,
        children: [  
          {
            path: "payment/success",
            loader: successLoader,
            element: <Success />,
          }
        ]
      },
      {
        path: "store",
        async lazy() {
          const { Store, storeLoader } = await import ("./routes/store")
          return {
            loader: storeLoader,
            Component: Store,
          }
        },
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "cart",
        element: <ShoppingCart />,
      },

      {
        element: <AuthLayout />,
        children: [
          {
            path: "register",
            loader: registerLoader,
            action: registerAction,
            element: <Register />,
          },
          {
            path: "login",
            loader: loginLoader,
            action: loginAction,
            element: <Login />,
          },
          {
            path: "reset-password",
            async lazy() {  
              const { resetPassAction, ResetPassword } = await import("./routes/auth/reset-password");
              return { 
                action: resetPassAction,
                Component: ResetPassword ,
              }
            },
          },
          {
            path: "reset/:uidb64/:token",
            action: confirmResetAction,
            element: <ConfirmReset />,
          },
        ],
      },
      {
        path: "logout",
        loader() {
          return redirect("/");
        },
        async action() {
          await authProvider.logout();
          return redirect("/");
        },
      },
      {
        path: "comment",
        action: commentAction,
      },
    ],
  },
];

const router = createBrowserRouter(routes as RouteObject[], {
  future: {
    v7_normalizeFormMethod: true,
  },
  
});

function App() {
  return <RouterProvider data-testid="app" router={router} />;
}

export default App;
