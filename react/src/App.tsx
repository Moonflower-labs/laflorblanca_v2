/* eslint-disable @typescript-eslint/no-unused-vars */
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import type { RouteObject } from "react-router-dom";
import RootLayout from "./components/layouts/RootLayout";
import ErrorPage from "./routes/Error";
import Homepage, { homeAction, homeLoader } from "./components/Homepage";
import authProvider from "./utils/auth";
import { commentAction } from "./routes/comments";
import Checkout from "./routes/payments/checkout";
import Success, { successLoader } from "./routes/payments/success";
import Subscribe from "./routes/payments/subscribe";
import protectedRouteLoader, { protectedLoader } from "./config/protectedRouteLoader";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsLayout from "./components/layouts/PaymentsLayout";
import { Personality, personalityAction, personalityLoader } from "./routes/members/personality";
import { BasicDetail, basicDetailAction, basicDetailLoader } from "./routes/members/personality/detail";
import { SoulDetail, soulDetailAction, soulDetailLoader } from "./routes/members/soul/detail";
import { Soul, soulLoader } from "./routes/members/soul";
import { Spirit, spiritLoader } from "./routes/members/spirit";
import { SpiritDetail, spiritDetailAction, spiritDetailLoader } from "./routes/members/spirit/detail";
import NotFound from "./routes/404";


const routes: RouteObject[] = [
  {
    id: "root",
    path: "/",
    async loader() {
      const stripePromise = loadStripe("pk_test_51LIRtEAEZk4zaxmw2ngsEkzDCYygcLkU5uL4m2ba01aQ6zXkWFXboTVdNH71GBZzvHNmiRU13qtQyjjCvTzVizlX00yXeplNgV");

      return { user: await authProvider.checkAuthentication() || null, stripePromise };
    },

    Component: RootLayout,
    ErrorBoundary: ErrorPage,
    children: [
      {
        index: true,
        loader: homeLoader,
        action: homeAction,
        Component: Homepage,
      },
      {
        lazy: async () => {
          const { MembersLayout } = await import("./components/layouts/MembersLayout");
          return { Component: MembersLayout };
        },
        ErrorBoundary: ErrorPage,
        children: [
          {
            // loader({ request }) {
            //   return protectedLoader({ request })
            // },
            path: "personality",
            children: [
              {
                index: true,
                loader: personalityLoader,
                action: personalityAction,
                Component: Personality,
              },
              {
                path: "post/:id",
                loader: basicDetailLoader,
                action: basicDetailAction,
                Component: BasicDetail,
              },
            ],
          },
          {
            path: "soul",
            // loader({ request }) {
            //   return protectedLoader({ request })
            // },
            children: [
              {
                index: true,
                loader: soulLoader,
                Component: Soul,
              },
              {
                path: "video/:id",
                loader: soulDetailLoader,
                action: soulDetailAction,
                Component: SoulDetail,
              },
            ],
          },
          {
            path: "spirit",
            // loader({ request }) {
            //   return protectedLoader({ request })
            // },
            children: [
              {
                index: true,
                loader: spiritLoader,
                Component: Spirit,
              },
              {
                path: "video/:id",
                loader: spiritDetailLoader,
                action: spiritDetailAction,
                Component: SpiritDetail,
              },
            ],
          },
        ],
      },
      {
        path: "questions",
        lazy: async () => {
          const { QuestionLayout } = await import("./components/layouts/QuestionLayout");
          return { Component: QuestionLayout }
        },
        ErrorBoundary: ErrorPage,
        children: [
          {
            loader({ request }) {
              return protectedLoader({ request })
            },
            path: "basic",
            children: [
              {
                index: true,
                lazy: async () => {
                  const { basicLoader, basicAction, BasicQuestion } = await import("./routes/questions/basic");
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
            // loader({ request }) {
            //   return protectedLoader({ request })
            // },
            path: "tarot",
            children: [
              {
                index: true,
                lazy: async () => {
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
            // loader({ request }) {
            //   return protectedLoader({ request })
            // },
            path: "live",
            children: [
              {
                index: true,
                lazy: async () => {
                  const { liveLoader, liveAction, Live } = await import("./routes/questions/live");
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
        lazy: async () => {
          const { userProfileAction } =
            await import("./routes/userProfile/profile")
          const { UserProfileLayout } = await import("./components/layouts/UserProfileLayout")

          return {
            action: userProfileAction,
            Component: UserProfileLayout,
          }
        },
        loader: protectedRouteLoader,
        children: [
          {
            index: true,
            lazy: async () => {
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
            lazy: async () => {
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
            lazy: async () => {
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
        lazy: async () => {
          const { Help } = await import("./routes/help")
          return { Component: Help }
        },
      },
      {
        path: "subscribe",
        Component: Subscribe,
      },
      {
        Component: PaymentsLayout,
        children: [
          {
            path: "payment/success",
            loader: successLoader,
            Component: Success,
          }
        ]
      },
      {
        path: "store",
        lazy: async () => {
          const { Store, storeLoader } = await import("./routes/store")
          return {
            loader: storeLoader,
            Component: Store,
          }
        },
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        lazy: async () => {
          const { AuthLayout } = await import("./components/layouts/AuthLayout");
          return { Component: AuthLayout }
        },
        children: [
          {
            path: "register",
            lazy: async () => {
              const { registerLoader, registerAction, Register } = await import("./routes/auth/register")
              return {
                loader: registerLoader,
                action: registerAction,
                Component: Register,
              }
            },
          },
          {
            path: "login",
            lazy: async () => {
              const { loginLoader, loginAction, Login } = await import("./routes/auth/login")
              return {
                loader: loginLoader,
                action: loginAction,
                Component: Login,
              }
            }
          },
          {
            path: "reset-password",
            lazy: async () => {
              const { resetPassAction, ResetPassword } = await import("./routes/auth/reset-password");
              return {
                action: resetPassAction,
                Component: ResetPassword,
              }
            },
          },
          {
            path: "reset/:uidb64/:token",
            lazy: async () => {
              const { confirmResetAction, ConfirmReset } = await import("./routes/auth/reset-confirmation");
              return {
                action: confirmResetAction,
                Component: ConfirmReset,
              }
            },
          },
        ],
      },
      {
        path: "*",
        ErrorBoundary: ErrorPage,
        Component: NotFound,
      },
    ],
  },
  {
    path: "logout",
    async action() {
      await authProvider.logout();
      return redirect("/");
    },
  },
  {
    path: "comment",
    action: commentAction,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_normalizeFormMethod: true,
  },

});

function App() {
  return <RouterProvider data-testid="app" router={router} />;
}

export default App;
