// components/Breadcrumb.jsx
import React from "react";

const Breadcrumb = ({ items }) => (
  <nav className="text-sm breadcrumbs">
    <ol className="breadcrumb">
      {items.map((item, index) => (
        <li key={index} className={`breadcrumb-item${item.active ? " active" : ""}`}>
          {item.active ? (
            <span>{item.label}</span>
          ) : (
            <a href={item.href} className="link">
              {item.label}
            </a>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
