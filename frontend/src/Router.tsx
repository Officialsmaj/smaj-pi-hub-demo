import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EngagementTasksPage from "./pages/EngagementTasksPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import GenericPage from "./pages/GenericPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import HowItWorksPage from "./pages/HowItWorksPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import WhitePaperPage from "./pages/WhitePaperPage.tsx";
import CommunityPage from "./pages/CommunityPage.tsx";
import DevelopersPage from "./pages/DevelopersPage.tsx";
import PartnersPage from "./pages/PartnersPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import { CookiesPage, PrivacyPage, ReportAbusePage, TermsPage } from "./pages/LegalPages.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/about",
      element: <AboutPage />,
    },
    {
      path: "/services",
      element: <ServicesPage />,
    },
    {
      path: "/white-paper",
      element: <WhitePaperPage />,
    },
    {
      path: "/how-it-works",
      element: <HowItWorksPage />,
    },
    {
      path: "/pricing",
      element: <PricingPage />,
    },
    {
      path: "/faq",
      element: <FaqPage />,
    },
    {
      path: "/contact",
      element: <ContactPage />,
    },
    {
      path: "/affiliate",
      element: <GenericPage title="Affiliate Program" description="Affiliate page conversion is in progress." />,
    },
    {
      path: "/collaborate",
      element: <GenericPage title="Collaborate With Us" description="Collaboration page conversion is in progress." />,
    },
    {
      path: "/partners",
      element: <PartnersPage />,
    },
    {
      path: "/community",
      element: <CommunityPage />,
    },
    {
      path: "/developers",
      element: <DevelopersPage />,
    },
    {
      path: "/blog",
      element: <BlogPage />,
    },
    {
      path: "/blog/:slug",
      element: <BlogPostPage />,
    },
    {
      path: "/privacy",
      element: <PrivacyPage />,
    },
    {
      path: "/terms",
      element: <TermsPage />,
    },
    {
      path: "/cookies",
      element: <CookiesPage />,
    },
    {
      path: "/report-abuse",
      element: <ReportAbusePage />,
    },
    {
      path: "/engagement-tasks",
      element: <EngagementTasksPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    basename: "/smajpihub",
  },
);

export default router;
