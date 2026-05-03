import AppLayout from "../layouts/AppLayout";
import { useAuthContext } from "../contexts/AuthContext";

const EngagementTasksPage = () => {
  const { isAuthenticated, signIn } = useAuthContext();

  return (
    <AppLayout>
      <main className="home-page">
        <section className="home-section">
          <div className="home-section-head">
            <h1>Engagement Tasks</h1>
            {isAuthenticated ? (
              <p>Task dashboard is now account-aware. Dynamic task feeds and rewards API integration are next.</p>
            ) : (
              <p>Please sign in with Pi to access your engagement task dashboard.</p>
            )}
          </div>
          {!isAuthenticated ? <button onClick={signIn}>Login with Pi</button> : null}
        </section>
      </main>
    </AppLayout>
  );
};

export default EngagementTasksPage;
