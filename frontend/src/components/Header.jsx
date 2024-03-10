import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
     <h1> <Link className="headerText" to="/">Event Ready!</Link></h1> 
    </div>
  );
}