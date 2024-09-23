import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Library that provides the custom hook for state sync and persistance
import { useLocalStorage } from "@uidotdev/usehooks";
import StreamListHome from "./pages/StreamListHome";
import Movies from "./pages/Movies";
import Cart from "./pages/Cart";
import About from "./pages/About";
import User from "./pages/User";
import UserInformation from "./pages/UserInformation"; 
import UserPassword from "./pages/UserPassword"; 
import UserPayment from "./pages/UserPayment";
import UserSubscription from "./pages/UserSubscription";
import './App.css';
import homeIcon from './assets/home.png'; 
import moviesIcon from './assets/movies.png';
import cartIcon from './assets/cart.png';
import aboutIcon from './assets/about.png';
import userIcon from './assets/user.png';
import logo from './assets/sllogo.png';
// Import TMDB service
import { fetchPopularMovies } from './services/tmdbService';

function App() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingText, setEditingText] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [movies, setMovies] = useLocalStorage("movies", []);

  const havefetched = useRef(false);
  useEffect(() => {
    // Fetch and store movies in localStorage
    async function fetchAndSetMovies() {
      if (!havefetched.current) {
        // ensures the fetch only happens once (react runs twice in dev-mode)
        havefetched.current = true;
        const fetchedMovies = await fetchPopularMovies();
        setMovies(fetchedMovies);
      }
    }
    fetchAndSetMovies();
  }, [setMovies]);

  // Load events from localStorage on mount
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("userEvents")) || [];
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("userEvents", JSON.stringify(events));
  }, [events]);

  const handleAddEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const handleClearEvents = () => {
    setEvents([]);
  };

  const handleIconClick = (iconName) => {
    handleAddEvent(`Icon Click: ${iconName} icon clicked`);
  };

  const handleIconHover = (iconName) => {
    handleAddEvent(`Icon Hover: ${iconName} icon hovered`);
  };

  // Function to start editing an event
  const handleEditEvent = (index) => {
    setEditingEvent(index);
    setEditingText(events[index]);
  };

  // Function to save the edited event
  const handleSaveEvent = () => {
    const updatedEvents = [...events];
    updatedEvents[editingEvent] = editingText;
    setEvents(updatedEvents);
    setEditingEvent(null);
    setEditingText("");
  };

  // Function to cancel event editing
  const handleCancelEdit = () => {
    setEditingEvent(null);
    setEditingText("");
  };

  // Function to delete an event
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter(
      (_, eventIndex) => eventIndex !== index
    );
    setEvents(updatedEvents);
  };

  return (
    <Router>
      <div className="streamlist-home-container">
        <header className="header">
          <img src={logo} alt="StreamList Logo" className="streamlist-logo" />
          <nav className="menu">
            <ul>
              <li>
                <Link to="/">
                  <img
                    src={homeIcon}
                    alt="Home"
                    className="menu-icon"
                    onClick={() => handleIconClick("Home")}
                    onMouseEnter={() => handleIconHover("Home")}
                  />
                </Link>
              </li>
              <li>
                <Link to="/movies">
                  <img
                    src={moviesIcon}
                    alt="Movies 2"
                    className="menu-icon"
                    onClick={() => handleIconClick("Movies")}
                    onMouseEnter={() => handleIconHover("Movies")}
                  />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <img
                    src={cartIcon}
                    alt="Cart"
                    className="menu-icon"
                    onClick={() => handleIconClick("Cart")}
                    onMouseEnter={() => handleIconHover("Cart")}
                  />
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <img
                    src={aboutIcon}
                    alt="About"
                    className="menu-icon"
                    onClick={() => handleIconClick("About")}
                    onMouseEnter={() => handleIconHover("About")}
                  />
                </Link>
              </li>
              <li>
                <Link to="/user">
                  <img
                    src={userIcon}
                    alt="User"
                    className="menu-icon"
                    onClick={() => handleIconClick("User")}
                    onMouseEnter={() => handleIconHover("User")}
                  />
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={<StreamListHome onAddEvent={handleAddEvent} />}
          />
          <Route
            path="/movies"
            element={<Movies onAddEvent={handleAddEvent} />}
          />
          <Route path="/cart" element={<Cart onAddEvent={handleAddEvent} />} />
          <Route
            path="/about"
            element={<About onAddEvent={handleAddEvent} />}
          />
          <Route path="/user" element={<User onAddEvent={handleAddEvent} />} />
          {/* Submenu */}
          <Route
            path="/user/information"
            element={<UserInformation onAddEvent={handleAddEvent} />}
          />
          <Route path="/user/password" element={<UserPassword />} />
          <Route path="/user/payment" element={<UserPayment />} />
          <Route path="/user/subscription" element={<UserSubscription />} />
        </Routes>
        <div className="user-events-container">
          <h2>User Events</h2>
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                {editingEvent === index ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={handleSaveEvent}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    {event}
                    <button onClick={() => handleEditEvent(index)}>Edit</button>
                    <button onClick={() => handleDeleteEvent(index)}>
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
          {events.length > 0 && (
            <button onClick={handleClearEvents}>Clear Events</button>
          )}
        </div>
      </div>
    </Router>
  );
}

export default App;