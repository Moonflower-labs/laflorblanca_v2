/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createBrowserRouter,
  redirect,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import MembersLayout from "./components/layouts/MembersLayout";
import AuthLayout from "./components/layouts/AuthLayout";
import ErrorPage from "./routes/Error";
import Homepage from "./components/Homepage";
import Login, { loginLoader, loginAction } from "./routes/auth/login";
import Register from "./routes/auth/register";
import { registerLoader, registerAction } from "./routes/auth/register";
import Personality, {
  personalityAction,
  personalityLoader,
} from "./routes/members/personality";
import BasicDetail, {
  basicDetailLoader,
  basicDetailAction,
} from "./routes/members/personality/detail";
import Soul, { soulLoader } from "./routes/members/soul";
import SoulDetail, {
  soulDetailLoader,
  soulDetailAction,
} from "./routes/members/soul/detail";
import Spirit, { spiritLoader } from "./routes/members/spirit";
import SpiritDetail, {
  spiritDetailAction,
  spiritDetailLoader,
} from "./routes/members/spirit/detail";
import Help from "./routes/help";
import AuthProvider from "./utils/auth";
import { commentAction } from "./routes/comments";
import QuestionLayout from "./components/layouts/QuestionLayout";
import BasicQuestion, {
  basicAction,
  basicLoader,
} from "./routes/questions/basic";
import Live from "./routes/questions/live";
import { liveAction, liveLoader } from "./routes/questions/live";
import Tarot, { tarotAction, tarotLoader } from "./routes/questions/tarot";
import Checkout from "./routes/payments/checkout";
import Success, { successLoader } from "./routes/payments/success";
import Subscribe from "./routes/payments/subscribe";
// import PaymentsLayout from "./components/layouts/PaymentsLayout";
import Store, { storeLoader } from "./routes/store";
import ShoppingCart from "./components/ui/ShoppingCart";
import handleAccessRestriction from "./config/permissions";
import protectedRouteLoader from "./config/protectedRouteLoader";
import { loadStripe } from "@stripe/stripe-js";
import UserProfile, {
  userProfileAction,
  userProfileLoader,
} from "./routes/userProfile/profile";
import Subscription from "./routes/userProfile/subscription";
import Favorites from "./routes/userProfile/favorites";
import ResetPassword, { resetPassAction } from "./routes/auth/reset-password";
import ConfirmReset, {
  confirmResetAction,
} from "./routes/auth/reset-confirmation";
import { subscriptionAction } from "./components/SubscriptionPlans";
import PaymentsLayout from "./components/layouts/PaymentsLayout";

const routes = [
  {
    id: "root",
    path: "/",
    async loader() {
       const stripePromise = loadStripe("pk_test_51LIRtEAEZk4zaxmw2ngsEkzDCYygcLkU5uL4m2ba01aQ6zXkWFXboTVdNH71GBZzvHNmiRU13qtQyjjCvTzVizlX00yXeplNgV");

      return { user: await AuthProvider.checkAuthentication(), stripePromise };
    },
 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Homepage />,
        action: subscriptionAction,

      },
      {
        element: <MembersLayout />,
        errorElement: <ErrorPage />,
        loader: protectedRouteLoader,
        children: [
          {
            loader: async () => {
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
                element: <Spirit />,
              },
              {
                path: "video/:id",
                loader: spiritDetailLoader,
                action: spiritDetailAction,
                element: <SpiritDetail />,
              },
            ],
          },
        ],
      },
      {
        path: "questions",
        element: <QuestionLayout />,
        errorElement: <ErrorPage />,
        loader: protectedRouteLoader,
        children: [
          {
            loader: async () => {
              // Check user permissions
              if (!(await handleAccessRestriction("Personalidad"))) {
                return redirect("/#plans");
              }
              return null;
            },
            path: "basic",
            children: [
              {
                index: true,
                loader: basicLoader,
                action: basicAction,
                element: <BasicQuestion />,
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
                loader: tarotLoader,
                action: tarotAction,
                element: <Tarot />,
              },
            ],
          },
          {
            loader: async () => {
              // Check user permissions
              if (!(await handleAccessRestriction("Espíritu"))) {
                return redirect("/#plans");
              }
              return null;
            },
            path: "live",
            children: [
              {
                index: true,

                loader: liveLoader,
                action: liveAction,
                element: <Live />,
              },
            ],
          },
        ],
      },
      {
        path: "user-profile",
        loader: userProfileLoader,
        action: userProfileAction,
        element: <UserProfile />,
        children: [
          {
            path: "subscription",
            element: <Subscription />,
          },
          {
            path: "favorites",
            element: <Favorites />,
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
        loader: storeLoader,
        element: <Store />,
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
            action: resetPassAction,
            element: <ResetPassword />,
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
          await AuthProvider.logout();
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
  // async unstable_dataStrategy({
  //   request,
  //   params,
  //   matches,
  // }) {
  //   // Run middleware sequentially and let them add data to `context`
  //   const context = {};
  //   for (const match of matches) {
  //     if (match.route.handle?.middleware) {
  //       await match.route.handle.middleware(
  //         { request, params },
  //         context
  //       );
  //     }
  //   }

  //   // Run loaders in parallel with the `context` value
  //   return Promise.all(
  //     matches.map((match, _i) =>
  //       match.resolve(async (handler) => {
  //         // Whatever you pass to `handler` will be passed as the 2nd parameter
  //         // to your loader/action
  //         const result = await handler(context);
  //         return { type: "data", result };
  //       })
  //     )
  //   );
  // },
  // // * Adding logging to routes
  // unstable_dataStrategy({ request, matches }) {
  //   return Promise.all(
  //     matches.map(async (match) => {
  //       console.log(`Processing route ${match.route.id}`);
  //       const result = await match.resolve();
  //       console.log(`Done processing route ${match.route.id}`);
  //       console.log(`url ${request.url}`);

  //       return result;
  //     })
  //   );
  // },
});

function App() {
  return <RouterProvider data-testid="app" router={router} />;
}

export default App;
