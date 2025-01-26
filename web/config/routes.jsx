import { SignedInOrRedirect, SignedOutOrRedirect } from "@gadgetinc/react";
import { Suspense } from "react";
import { createBrowserRouter } from "react-router";

export const AUTH_REDIRECT_PATHS = {
  postSignIn: "/signed-in",
  postSignOut: "/sign-in",
  dashboard: "/profile"
};

import Index from "../routes/index";
import SignIn from "../routes/sign-in";
import SignUp from "../routes/sign-up";
import SignedIn from "../routes/signed-in";
import Profile from "../routes/profile";
import Questions from "../routes/questions";
import ChangePassword from "../routes/change-password";
import ForgotPassword from "../routes/forgot-password";
import ResetPassword from "../routes/reset-password";
import VerifyEmail from "../routes/verify-email";

import MainLayout from "../components/layout/MainLayout";
import ProfileLayout from "../components/profile/ProfileLayout";
import ErrorBoundary from "../components/common/ErrorBoundary";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <SignedOutOrRedirect path="/signed-in">
            <Index />
          </SignedOutOrRedirect>
        )
      },
      {
        path: "verify-email",
        element: <VerifyEmail />
      },
      {
        path: "sign-in",
        element: (
          <Suspense fallback="Loading...">
            <SignedOutOrRedirect path="/signed-in">
              <SignIn />
            </SignedOutOrRedirect>
          </Suspense>
        )
      },
      {
        path: "sign-up",
        element: (
          <Suspense fallback="Loading...">
            <SignedOutOrRedirect path="/signed-in">
              <SignUp />
            </SignedOutOrRedirect>
          </Suspense>
        )
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback="Loading...">
            <SignedOutOrRedirect path="/signed-in">
              <ForgotPassword />
            </SignedOutOrRedirect>
          </Suspense>
        )
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback="Loading...">
            <SignedOutOrRedirect path="/signed-in">
              <ResetPassword />
            </SignedOutOrRedirect>
          </Suspense>
        )
      },
      {
        path: "signed-in",
        element: (
          <Suspense fallback="Loading...">
            <SignedInOrRedirect path={AUTH_REDIRECT_PATHS.postSignOut}>
              <SignedIn />
            </SignedInOrRedirect>
          </Suspense>
        )
      },
      {
        path: "profile",
        element: (
          <Suspense fallback="Loading...">
            <SignedInOrRedirect path="/sign-in">
              <ProfileLayout>
                <Profile />
              </ProfileLayout>
            </SignedInOrRedirect>
          </Suspense>
        )
      },
      {
        path: "questions",
        element: (
          <Suspense fallback="Loading...">
            <SignedInOrRedirect path="/sign-in">
              <Questions />
            </SignedInOrRedirect>
          </Suspense>
        )
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback="Loading...">
            <SignedInOrRedirect path="/sign-in">
              <ChangePassword />
            </SignedInOrRedirect>
          </Suspense>
        )
      }
    ]
  }
];

export const router = createBrowserRouter(routes);
