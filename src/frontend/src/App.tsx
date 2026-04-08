import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";
import { SupportChat } from "./components/SupportChat";

const HomePage = lazy(() => import("./pages/Home"));
const StorePage = lazy(() => import("./pages/Store"));
const CheckoutPage = lazy(() => import("./pages/Checkout"));
const UploadPage = lazy(() => import("./pages/Upload"));
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const RoyaltiesPage = lazy(() => import("./pages/Royalties"));
const LoginPage = lazy(() => import("./pages/Login"));
const SignupPage = lazy(() => import("./pages/Signup"));
const AdminPage = lazy(() => import("./pages/Admin"));
const ArtistProfilePage = lazy(() => import("./pages/ArtistProfile"));
const CustomerLoginPage = lazy(() => import("./pages/CustomerLogin"));
const CustomerSignupPage = lazy(() => import("./pages/CustomerSignup"));

// Legal pages
const TermsOfServicePage = lazy(() => import("./pages/legal/TermsOfService"));
const PrivacyPolicyPage = lazy(() => import("./pages/legal/PrivacyPolicy"));
const CookiePolicyPage = lazy(() => import("./pages/legal/CookiePolicy"));
const DMCAPage = lazy(() => import("./pages/legal/DMCA"));
const RoyaltyPolicyPage = lazy(() => import("./pages/legal/RoyaltyPolicy"));
const HelpCenterPage = lazy(() => import("./pages/legal/HelpCenter"));
const ContactUsPage = lazy(() => import("./pages/legal/ContactUs"));
const FileComplaintPage = lazy(() => import("./pages/legal/FileComplaint"));
const ArtistResourcesPage = lazy(() => import("./pages/legal/ArtistResources"));
const DistributionGuidePage = lazy(
  () => import("./pages/legal/DistributionGuide"),
);
const RoyaltyFAQPage = lazy(() => import("./pages/legal/RoyaltyFAQ"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <span className="text-4xl animate-bounce">👑</span>
        <p className="text-muted-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <SupportChat />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/store",
  component: StorePage,
});
const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/checkout",
  component: CheckoutPage,
});
const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upload",
  component: UploadPage,
});
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});
const royaltiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/royalties",
  component: RoyaltiesPage,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signup",
  component: SignupPage,
});
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});
const artistProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artist/$artistId",
  component: ArtistProfilePage,
});
const customerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customer-login",
  component: CustomerLoginPage,
});
const customerSignupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/customer-signup",
  component: CustomerSignupPage,
});

// Legal routes
const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms",
  component: TermsOfServicePage,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: PrivacyPolicyPage,
});
const cookiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cookies",
  component: CookiePolicyPage,
});
const dmcaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dmca",
  component: DMCAPage,
});
const royaltyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/royalty-policy",
  component: RoyaltyPolicyPage,
});
const helpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/help",
  component: HelpCenterPage,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactUsPage,
});
const complaintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/complaint",
  component: FileComplaintPage,
});
const artistResourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/artist-resources",
  component: ArtistResourcesPage,
});
const distributionGuideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/distribution-guide",
  component: DistributionGuidePage,
});
const royaltyFAQRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/royalty-faq",
  component: RoyaltyFAQPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  storeRoute,
  checkoutRoute,
  uploadRoute,
  dashboardRoute,
  royaltiesRoute,
  loginRoute,
  signupRoute,
  adminRoute,
  artistProfileRoute,
  customerLoginRoute,
  customerSignupRoute,
  termsRoute,
  privacyRoute,
  cookiesRoute,
  dmcaRoute,
  royaltyPolicyRoute,
  helpRoute,
  contactRoute,
  complaintRoute,
  artistResourcesRoute,
  distributionGuideRoute,
  royaltyFAQRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
