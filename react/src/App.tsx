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
import protectedRouteLoader from "./config/protectedRouteLoader";
import { loadStripe } from "@stripe/stripe-js";
import PaymentsLayout from "./components/layouts/PaymentsLayout";
import NotFound from "./routes/404";
import { Personality, personalityAction, personalityLoader } from "./routes/members/personality/index";
import { BasicDetail, basicDetailAction, basicDetailLoader } from "./routes/members/personality/detail";
import { Soul, soulAction, soulLoader } from "./routes/members/soul/index";
import { SoulDetail, soulDetailAction, soulDetailLoader } from "./routes/members/soul/detail";
import { SpiritDetail, spiritDetailAction, spiritDetailLoader } from "./routes/members/spirit/detail";
import { Spirit, spiritAction, spiritLoader } from "./routes/members/spirit/index";


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
        lazy: () => import("./components/layouts/MembersLayout"),
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
                action: soulAction,
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
                action: spiritAction,
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
        lazy: () => import("./components/layouts/QuestionLayout"),

        ErrorBoundary: ErrorPage,
        children: [
          {
            // loader({ request }) {
            //   return protectedLoader({ request })
            // },
            path: "basic",
            children: [
              {
                index: true,
                lazy: () => import("./routes/questions/basic"),
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
                lazy: () => import("./routes/questions/tarot"),
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
                lazy: () => import("./routes/questions/live"),
              },
            ],
          },
        ],
      },
      {
        path: "user-profile",
        loader: protectedRouteLoader,
        lazy: () => import("./components/layouts/UserProfileLayout"),
        children: [
          {
            index: true,
            lazy: () => import("./routes/userProfile/profile"),
          },
          {
            path: "subscription",
            lazy: () => import("./routes/userProfile/subscription"),
          },
          {
            path: "favorites",
            lazy: () => import("./routes/userProfile/favorites")
          },
        ],
      },
      {
        path: "help",
        lazy: () => import("./routes/help")
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
        id: "store",
        path: "store",
        lazy: () => import("./routes/store"),
        handle: {
          lazyChildren: () => import("./routes/help"),
        }
      },
      {
        path: "checkout",
        Component: Checkout,
      },
      {
        lazy: () => import("./components/layouts/AuthLayout"),

        children: [
          {
            path: "register",
            lazy: () => import("./routes/auth/register")
          },
          {
            path: "login",
            lazy: () => import("./routes/auth/login")
          },
          {
            path: "reset-password",
            lazy: () => import("./routes/auth/reset-password"),
          },
          {
            path: "reset/:uidb64/:token",
            lazy: () => import("./routes/auth/reset-confirmation"),
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
  async unstable_patchRoutesOnMiss({ matches, patch }) {
    console.log("Fog of war!")
    const leafRoute = matches[matches.length - 1]?.route;
    if (leafRoute?.handle?.lazyChildren) {
      const children = await leafRoute.handle.lazyChildren();
      patch(leafRoute.id as string, children);
    }
  }
});

export default function App() {
  return <RouterProvider data-testid="app" router={router} />;
}