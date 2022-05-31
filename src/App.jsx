import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import routes from "./pages/routes";

export default function App() {
    return (
        <Router>
            <Routes>
                {routes.map((data, index) => (
                    <Route
                        onUpdate={() => window.scrollTo(0, 0)}
                        exact={true}
                        path={data.path}
                        element={data.component}
                        key={index}
                    />
                ))}
            </Routes>
            <ScrollToTop />
        </Router>
    );
}
