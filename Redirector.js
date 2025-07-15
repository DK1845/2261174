import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Redirector = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const targetUrl = localStorage.getItem(shortcode);
    if (targetUrl) {
      window.location.href = targetUrl;
    } else {
      navigate("/");
    }
  }, [shortcode, navigate]);

  return <p>Redirecting...</p>;
};

export default Redirector;
