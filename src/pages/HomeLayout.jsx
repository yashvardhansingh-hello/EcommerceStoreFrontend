import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import Chatbot from "../components/AiChatBot/ChatBot";
import Footer from "../components/Footer";
import WelcomePreferenceModal from "../components/Modals/WelcomePreferenceModal";
import { useEffect, useState } from "react";
import { useUpdateUserPreferencesMutation } from "../features/api";
import { useAsyncMutation } from "../hooks/hook";
import NormalWelcomeModal from "../components/Modals/NormalWelcomeModal";

const HomeLayout = () => {
  const {isPageLoading} = useSelector((state) => state.productState);
  const {user} = useSelector((state) => state.userState);
  
  const [showModal, setShowModal] = useState(false);
  const [showNormalModal, setNormalModal] = useState(false);

  const[updateUserPreferences, isUpdating] = useAsyncMutation(useUpdateUserPreferencesMutation);

  const currentPage = window.location.pathname;


  useEffect(() => {
    // Show modal after a short delay post-signup
    if(currentPage !== "/") return;
    if(user?.preferences?.categories?.length === 3 && user?.preferences?.companies?.length === 3 || !user) {
      const timer = setTimeout(() => setNormalModal(true), 600);
      return () => clearTimeout(timer);
    }
     if(!user) return; 
    const timer = setTimeout(() => setShowModal(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleSavePreferences = async (preferences) => {
     
   await updateUserPreferences("creating personalized experience ...", {categories: preferences.categories.map((i) => i._id), companies: preferences.companies.map((i) => i._id)});
    // TODO: Save to DB or context
  };

  return (
    <>
      <Header />
      <Navbar />
      <NormalWelcomeModal isOpen={showNormalModal} onClose={() => setNormalModal(false)}  />
      <WelcomePreferenceModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSavePreferences}
      />{" "}
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className=" px-2 md:px-3 min-h-[100vh] lg:px-3">
          <Outlet />
        </section>
      )}
      <Footer />
      <Chatbot />
    </>
  );
};
export default HomeLayout;
